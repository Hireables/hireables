module Stackoverflow
  extend ActiveSupport::Concern

  included do
    STACKOVERFLOW_ANSWERS_URI = 'https://api.stackexchange.com/2.2/me/answers'.freeze
  end

  def fetch_answers
    agent = initialize_agent("#{STACKOVERFLOW_ANSWERS_URI}?#{sw_query_params}")
    Rails.cache.fetch(self) do
      root = agent.start
      answers = root.data.items
      answers
      .map { |answer| answer.tap { |obj| obj.id = obj.answer_id } }
      .lazy
      .sort_by{|item| [item.comment_count, item.up_vote_count]}
      .reverse!
      .to_a
    end
  end

  private

  def sw_query_params
    {
      filter: ENV.fetch('STACKOVERFLOW_ANSWERS_FILTER'),
      order: 'desc',
      sort: 'activity',
      pagesize: 10,
      site: 'stackoverflow',
      access_token: access_token,
      key: ENV.fetch('STACKOVERFLOW_CLIENT_KEY')
    }.to_query
  end
end
