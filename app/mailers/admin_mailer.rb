class AdminMailer < ActionMailer::Base
  default to: ENV.fetch('SIGNUPS_EMAIL'),
          from: ENV.fetch('MAILER_EMAIL')

  def new_user_signup(user_type, user_id)
    @user = user_types.fetch(user_type).find(user_id)
    mail(subject: "#{@user.name} joined as #{user_type.downcase}!") do |format|
      format.text
      format.html
    end
  end

  private

  def user_types
    { 'Employer' => Employer, 'Developer' => Developer }.freeze
  end
end
