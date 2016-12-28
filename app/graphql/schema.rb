GraphQL::ObjectType.accepts_definitions(
  model_names: GraphQL::Define.assign_metadata_key(:model_names)
)

Schema = GraphQL::Schema.define do
  query QueryType
  mutation MutationType
  max_depth 12
  rescue_from ActiveRecord::RecordInvalid, &:messag
  rescue_from ActiveRecord::Rollback, &:message
  rescue_from StandardError, &:message
  rescue_from ActiveRecord::RecordNotUnique, &:message
  rescue_from ActiveRecord::RecordNotFound, &:message
  object_from_id ->(id, _ctx) { decode_object(id) }
  id_from_object ->(obj, type, _ctx) { encode_object(obj, type) }
  resolve_type ->(obj, _ctx) do
    class_name = obj.class.name
    custom_resolved_type = Schema.types.values.find do |value|
      value.metadata[:model_names] &&
        value.metadata[:model_names].include?(class_name)
    end
    custom_resolved_type.nil? ? Schema.types[class_name] : custom_resolved_type
  end
end

def encode_object(object, type)
  GraphQL::Schema::UniqueWithinType.encode(
    type.name,
    object.id.to_s + '-' + object.class.name,
    separator: '---'
  )
end

def decode_object(id)
  type_name, object_id = GraphQL::Schema::UniqueWithinType.decode(
    id,
    separator: '---'
  )
  models.fetch(type_name).find(object_id)
end

# rubocop:disable Metrics/MethodLength
def models
  {
    'Employer' => Employer,
    'Developer' => Developer,
    'Import' => Import,
    'Connection' => Connection,
    'Favourite' => Favourite,
    'Viewer' => Viewer,
    'Composer' => Composer,
    'Conversation' => Mailboxer::Conversation,
    'Message' => Mailboxer::Message,
    'Mailbox' => Mailboxer::Mailbox,
    'Receipt' => Mailboxer::Receipt
  }.freeze
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
    files   = Dir['app/graphql/**/*.rb'].reject { |f| File.directory?(f) }
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
