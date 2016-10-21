class AdminMailer < ActionMailer::Base
  def new_recruiter_signup(recruiter_id)
    @recruiter = Recruiter.find(recruiter_id)
    mail(from: @recruiter.email, to: 'parul.rhl@gmail.com', subject: 'New Recruiter signup!') do |format|
      format.text
      format.html
    end
  end
end
