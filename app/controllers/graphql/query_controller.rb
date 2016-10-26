module Graphql
  class QueryController < ApplicationController
    before_action :verify_token!, :set_current_recruiter, :set_current_developer

    def create
      result = Schema.execute(
        params[:query],
        variables: ensure_hash(params[:variables]),
        context: {
          current_developer: set_current_developer,
          current_recruiter: set_current_recruiter,
          developer_signed_in: developer_signed_in?,
          recruiter_signed_in: recruiter_signed_in?,
          file: params[:file]
        }
      )
      render json: result
    end

    private

    def set_current_recruiter
      Recruiter.find_by(
        id: cookies.signed['recruiter.id']
      )
    end

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
