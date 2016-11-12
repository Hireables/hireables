module Stackoverflow
  extend ActiveSupport::Concern

  included do
    STACKOVERFLOW_ANSWERS_URI = 'https://api.stackexchange.com/2.2/me/answers'.freeze
  end

  def fetch_answers
    Rails.cache.fetch(self) do
      agent = initialize_agent("#{STACKOVERFLOW_ANSWERS_URI}?#{so_params}")
      root = agent.start
      answers = root.data.items
      answers.map { |answer| answer.tap { |obj| obj.id = obj.answer_id } }
    end

  rescue NoMethodError
    []
  end

  private

  def so_params
    {
      filter: ENV.fetch('STACKOVERFLOW_ANSWERS_FILTER'),
      order: 'desc',
      sort: 'votes',
      pagesize: 20,
      site: 'stackoverflow',
      access_token: access_token,
      key: ENV.fetch('STACKOVERFLOW_CLIENT_KEY')
    }.to_query
  end
end
