class AdminMailerWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'urgent', retry: 5

  def perform(user_type, user_id)
    AdminMailer.new_recruiter_signup(user_type, recruiter_id).deliver
  end
end
