class AdminMailerWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'urgent', retry: 5

  def perform(user_type, user_id)
    AdminMailer.new_user_signup(user_type, user_id).deliver
  end
end
