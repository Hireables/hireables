Schema = GraphQL::Schema.define do
  query QueryType
  mutation MutationType
  max_depth 8
  rescue_from ActiveRecord::RecordInvalid, &:messag
  rescue_from ActiveRecord::Rollback, &:message
  rescue_from StandardError, &:message
  rescue_from ActiveRecord::RecordNotUnique, &:message
  rescue_from ActiveRecord::RecordNotFound, &:message
  object_from_id ->(id, _ctx) { decode_object(id) }
  id_from_object ->(obj, type, _ctx) { encode_object(obj, type) }
  resolve_type ->(object, _ctx) { Schema.types[type_name(object)] }
end

def type_name(object)
  object.class.name
end

def encode_object(object, type)
  GraphQL::Schema::UniqueWithinType.encode(
    type.name,
    object.id,
    separator: '---'
  )
end

def decode_object(id)
  type_name, object_id = GraphQL::Schema::UniqueWithinType.decode(
    id,
    separator: '---'
  )
  Object.const_get(type_name).find(object_id)
end

# Responsible for dumping Schema.json
# to app/assets/javascripts/relay/
module SchemaHelpers
  # Schema.json location
  SCHEMA_DIR  = Rails.root.join('app/assets/config/')
  SCHEMA_PATH = File.join(SCHEMA_DIR, 'schema.json')

  def execute_introspection_query
    # Cache the query result
    Rails.cache.fetch checksum do
      Schema.execute GraphQL::Introspection::INTROSPECTION_QUERY
    end
  end

  def checksum
    files   = Dir['app/api/**/*.rb'].reject { |f| File.directory?(f) }
    content = files.map { |f| File.read(f) }.join
    Digest::SHA256.hexdigest(content).to_s
  end

  def dump_schema
    # Generate the schema on start/reload
    FileUtils.mkdir_p SCHEMA_DIR
    result = JSON.pretty_generate(Schema.execute_introspection_query)
    return if File.exist?(SCHEMA_PATH) && File.read(SCHEMA_PATH) == result
    File.write(SCHEMA_PATH, result)
  end
end

Schema.extend SchemaHelpers
