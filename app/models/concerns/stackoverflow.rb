module Stackoverflow
  extend ActiveSupport::Concern

  included do
    STACKOVERFLOW_BASE_URI = "https://api.stackexchange.com/2.2".freeze
  end

  def fetch_answers
    agent = Sawyer::Agent.new(
      "#{STACKOVERFLOW_BASE_URI}/me/answers?#{stackoverflow_query_params}",
      faraday: client
    ) do |http|
      http.headers['content-type'] = 'application/json'
    end
    root = agent.start
    root.data.items
  end

  private

  def stackoverflow_query_params
    {
      filter: '!2-1PreTBA.iShwUKwLsJz',
      order: 'desc',
      sort: 'activity',
      site: 'stackoverflow',
      access_token: access_token,
      key: ENV.fetch('STACKOVERFLOW_CLIENT_KEY')
    }.to_query
  end
end
