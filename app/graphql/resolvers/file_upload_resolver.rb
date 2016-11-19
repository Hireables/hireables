class FileUploadResolver
  attr_reader :file, :record, :user

  def self.call(*args)
    new(*args).call
  end

  def initialize(_obj, inputs, ctx)
    unless ctx[:current_employer].present?
      raise StandardError,
            'You are not logged in'
    end
    @user = ctx[:current_employer]
    @file = ctx[:file]
    @record = Schema.object_from_id(inputs['id'], ctx)
  end

  def call
    record.update!(avatar: file)
    { model_name.to_sym => record.reload }
  end

  private

  def model_name
    record.class.to_s.downcase
  end
end
