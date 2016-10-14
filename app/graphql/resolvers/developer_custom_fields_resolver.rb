class DeveloperCustomFieldResolver
  attr_reader :name, :type

  def initialize(field_name, field_type)
    @field_name = field_name
    @field_type = field_type
  end

  def call(obj, _args, _ctx)
    if field_type == :boolean
      obj.respond_to?(name) && obj.present? ? obj.public_send(name) : false
    else
      obj.respond_to?(name) ? obj.public_send(name) : nil
    end
  end
end
