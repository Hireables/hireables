module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_developer

    def connect
      self.current_developer = find_verified_developer
    end

    protected

    def find_verified_developer
      if current_developer = Developer.find_by(id: cookies.signed['developer.id'])
        current_developer
      else
        nil
      end
    end
  end
end
