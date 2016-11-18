module Producthunt
  extend ActiveSupport::Concern

  included do
    PRODUCTS_URI = 'https://api.producthunt.com/v1'.freeze
  end

  def fetch_products
    Rails.cache.fetch(self) do
      products['posts'].lazy.map do |product|
        HashWithIndifferentAccess.new(product.to_hash).except(*excluded_fields)
      end.take(20).to_a
    end
  rescue NoMethodError
    []
  end

  private

  def products
    response = client.get(
      "#{PRODUCTS_URI}/users/#{uid}/posts?&#{ph_params}",
      headers
    )
    JSON.parse(response.body)
  rescue JSON::ParserError
    { 'posts': [] }
  end

  def ph_params
    { access_token: access_token }.to_query
  end

  def excluded_fields
    %w(user screenshot_url makers current_user)
  end
end
