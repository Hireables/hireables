module HttpClient
  extend ActiveSupport::Concern

  private

  def headers
    { headers: { 'Content-Type' => 'application/json' } }
  end

  def client
    Faraday.new do |builder|
      builder.request  :url_encoded
      builder.response :logger unless Rails.env.test?
      builder.request :retry
      builder.adapter Faraday.default_adapter
    end
  end
end
