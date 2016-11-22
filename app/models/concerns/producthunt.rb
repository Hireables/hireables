module Producthunt
  extend ActiveSupport::Concern

  included do
    PRODUCTS_URI = 'https://api.producthunt.com/v1'.freeze
  end

  def fetch_products
    products.lazy.map do |product|
      obj['category'] = 'product'
      HashWithIndifferentAccess.new(product.to_hash).except(*ph_excluded_fields)
    end.take(20).to_a
  rescue NoMethodError
    []
  end

  private

  def products
    Rails.cache.fetch(self) do
      response = client.get(
        "#{PRODUCTS_URI}/users/#{uid}/posts?&#{ph_params}",
        headers
      )
      JSON.parse(response.body)['posts']
    end
  rescue JSON::ParserError
    { 'posts': [] }
  end

  def ph_params
    { access_token: access_token }.to_query
  end

  def ph_excluded_fields
    %w(user screenshot_url makers current_user)
  end
end
