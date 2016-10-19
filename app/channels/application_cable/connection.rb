module ApplicationCable
  class Connection < ActionCable::Connection::Base
    include AuthToken
    identified_by :current_recruiter

    def connect
      reject_unauthorized_connection && return unless valid_token?
      self.current_recruiter = find_current_recruiter
    end

    protected

    def find_current_recruiter
      Recruiter.find_by(id: cookies.signed['recruiter.id'])
    end
  end
end
