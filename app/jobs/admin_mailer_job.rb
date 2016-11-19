class AdminMailerJob < Que::Job
  def run(user_type, user_id)
    AdminMailer.new_user_signup(user_type, user_id).deliver
  end
end
