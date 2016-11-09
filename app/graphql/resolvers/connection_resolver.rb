class ConnectionResolver
  attr_reader :connection

  def self.call(*args)
    new(*args).call
  end

  def initialize(_obj, _inputs, ctx)
    raise StandardError, 'Unauthorised' unless ctx[:current_developer].present?
    @connection = Schema.object_from_id(params['id'], ctx)
    current_user = ctx[:current_developer]
    raise StandardError, 'Unauthorised' unless connection.owner?(current_user)
  end

  def call
    connection
  end
end
