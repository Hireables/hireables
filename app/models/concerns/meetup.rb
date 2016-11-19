module Meetup
  extend ActiveSupport::Concern

  included do
    MEETUP_EVENTS_URI = 'https://api.meetup.com/self/events'.freeze
  end

  def fetch_events
    events.lazy.map do |event|
      event.tap { |obj| obj['created'] = Time.at(obj['created'] / 1000).utc }
      HashWithIndifferentAccess.new(event.to_hash).except(*mu_excluded_fields)
    end.to_a
  rescue NoMethodError
    []
  end

  private

  def events
    Rails.cache.fetch(self) do
      response = client.get("#{MEETUP_EVENTS_URI}?&#{meetup_params}", headers)
      JSON.parse(response.body)
    end
  rescue JSON::ParserError
    []
  end

  def meetup_params
    {
      desc: true,
      access_token: access_token
    }.to_query
  end

  def mu_excluded_fields
    %w(venue group waitlist_count utc_offset)
  end
end
