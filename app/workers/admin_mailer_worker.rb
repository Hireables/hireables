class AdminMailerWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'urgent', retry: 5

  def perform(user_type, user_id)
    AdminMailer.new_user_signup(user_type, user_id).deliver

  ensure
    ActiveRecord::Base.clear_active_connections!
    ActiveRecord::Base.connection.close
  end
end
