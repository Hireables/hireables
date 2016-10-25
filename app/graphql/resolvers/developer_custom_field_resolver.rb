class DeveloperCustomFieldResolver
  attr_reader :field_name, :field_type

  def initialize(field_name, field_type)
    @field_name = field_name
    @field_type = field_type
  end

  def call(obj, _args, _ctx)
    if field_type == :boolean
      obj.respond_to?(field_name) ? obj.public_send(field_name) : false
    elsif field_type == :Array
      field = obj.respond_to?(field_name) ? obj.public_send(field_name) : []
      field.empty? ? field : field[0].split(',')
    else
      obj.respond_to?(field_name) ? obj.public_send(field_name) : nil
    end
  end
end
