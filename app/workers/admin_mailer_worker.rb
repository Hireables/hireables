class AdminMailerWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'urgent', retry: 5

  def perform(recruiter_id)
    AdminMailer.new_recruiter_signup(recruiter_id).deliver
  end
end
