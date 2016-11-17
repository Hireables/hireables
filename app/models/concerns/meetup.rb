module Meetup
  extend ActiveSupport::Concern

  included do
    MEETUP_EVENTS_URI = 'https://api.meetup.com/self/events'.freeze
  end

  def fetch_events
    Rails.cache.fetch(self) do
      response = client.get("#{MEETUP_EVENTS_URI}?&#{meetup_params}", headers)
      events = JSON.parse(response.body)
      events.lazy.map do |event|
        event.tap { |obj| obj['created'] = Time.at(obj['created'] / 1000).utc }
      end.to_a
    end
  rescue NoMethodError
    []
  end

  private

  def meetup_params
    {
      desc: true,
      access_token: access_token
    }.to_query
  end
end
