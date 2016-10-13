module Graphql
  class QueryController < ApplicationController
    skip_before_action :ensure_signup_complete
    before_action :verify_token!
    before_action :set_current_developer

    def create
      result = Schema.execute(
        params[:query],
        variables: ensure_hash(params[:variables]),
        context: {
          current_developer: set_current_developer,
          developer_signed_in: developer_signed_in?
        }
      )
      render json: result
    end

    private

    def set_current_developer
      Developer.find_by(
        id: cookies.signed['developer.id']
      )
    end

    def ensure_hash(query_variables)
      if query_variables.blank?
        {}
      elsif query_variables.is_a?(String)
        JSON.parse(query_variables)
      else
        query_variables
      end
    end
  end
end
