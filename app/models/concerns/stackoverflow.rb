module Stackoverflow
  extend ActiveSupport::Concern

  included do
    STACKOVERFLOW_ANSWERS_URI = 'https://api.stackexchange.com/2.2/me/answers'.freeze
  end

  def fetch_answers
    agent = initialize_agent("#{STACKOVERFLOW_ANSWERS_URI}?#{sw_query_params}")
    Rails.cache.fetch(self) do
      root = agent.start
      root.data.items
    end
  end

  private

  def sw_query_params
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
