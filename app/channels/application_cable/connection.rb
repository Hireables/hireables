module ApplicationCable
  class Connection < ActionCable::Connection::Base
    include AuthToken
    identified_by :current_developer

    def connect
      unless token?
        reject_unauthorized_connection and return
      end
      self.current_developer = find_current_developer
    end

    protected

    def find_current_developer
      Developer.find_by(id: cookies.signed['developer.id'])
    end

    private

    def request_token
      @request_token ||= cookies.signed['_graphql_token']
    end
  end
end
