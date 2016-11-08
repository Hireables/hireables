module Graphql
  class QueryController < ApplicationController
    before_action :verify_token!
    skip_before_action :show_developer_edit!
    include GraphqlAuthentication

    def create
      result = Schema.execute(
        params[:query],
        variables: ensure_hash(params[:variables]),
        context: context_hash,
      )
      render json: result
    end

    private

    def context_hash
      {
        current_developer: find_current_developer,
        current_employer: find_current_employer,
        current_user: find_current_user,
        cookies: cookies,
        file: params[:file]
      }
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
