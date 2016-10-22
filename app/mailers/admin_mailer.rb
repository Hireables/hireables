class AdminMailer < ActionMailer::Base
  default to: ENV.fetch('SIGNUPS_EMAIL'),
          from: ENV.fetch('MAILER_EMAIL')

  def new_recruiter_signup(recruiter_id)
    @recruiter = Recruiter.find(recruiter_id)
    mail(subject: 'New Recruiter signup!') do |format|
      format.text
      format.html
    end
  end
end
