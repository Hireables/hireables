module ApplicationCable
  class Connection < ActionCable::Connection::Base
    include AuthToken
    identified_by :current_developer

    def connect
      reject_unauthorized_connection && return unless valid_token?
      self.current_developer = find_current_developer
    end

    protected

    def find_current_developer
      Developer.find_by(id: cookies.signed['developer.id'])
    end
  end
end
