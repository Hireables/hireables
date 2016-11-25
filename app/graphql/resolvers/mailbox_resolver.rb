class MailboxResolver
  attr_reader :type, :user, :params

  def self.call(*args)
    new(*args).call
  end

  def initialize(_obj, inputs, ctx)
    raise StandardError, 'Unauthorised' unless ctx[:current_user].present?
    @user = ctx[:current_user]
    safe_params = inputs.instance_variable_get(:@original_values).to_h
    @params = HashWithIndifferentAccess.new(safe_params)
  end

  def call
    Mailboxer::Mailbox.new(user, params[:id] || 'inbox')
  end
end
