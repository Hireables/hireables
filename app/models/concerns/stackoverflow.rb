module Stackoverflow
  extend ActiveSupport::Concern

  included do
    SO_ANSWERS_URI = 'https://api.stackexchange.com/2.2/me/answers'.freeze
  end

  def fetch_answers
    Rails.cache.fetch(self) do
      response = client.get("#{SO_ANSWERS_URI}?&#{so_params}", headers)
      answers = JSON.parse(response.body)['items']
      return [] if answers.nil?
      answers.map do |answer|
        answer.tap do |obj|
          obj['id'] = obj['answer_id']
          obj['creation_date'] = Time.at(obj['creation_date']).utc
        end
      end
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
