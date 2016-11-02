class AdminMailer < ActionMailer::Base
  default to: ENV.fetch('SIGNUPS_EMAIL'),
          from: ENV.fetch('MAILER_EMAIL')

  def new_recruiter_signup(user_type, user_id)
    @user = user_types.fetch(user_type).find(user_id)
    mail(subject: "New #{user_type.downcase} signup!") do |format|
      format.text
      format.html
    end
  end

  private

  def user_types
    { 'Recruiter' => Recruiter, 'Developer' => Developer }.freeze
  end
end
