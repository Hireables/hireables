module Stackoverflow
  extend ActiveSupport::Concern

  included do
    SO_ANSWERS_URI = 'https://api.stackexchange.com/2.2/me/answers'.freeze
  end

  def fetch_answers
    answers.map do |answer|
      answer.tap do |obj|
        obj['category'] = 'answer'
        obj['id'] = obj['answer_id']
        obj['creation_date'] = Time.at(obj['creation_date']).utc
      end
    end
  rescue NoMethodError
    []
  end

  private

  def answers
    Rails.cache.fetch(self) do
      response = client.get("#{SO_ANSWERS_URI}?&#{so_params}", headers)
      JSON.parse(response.body)['items']
    end
  rescue JSON::ParserError
    { 'items': [] }
  end

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
