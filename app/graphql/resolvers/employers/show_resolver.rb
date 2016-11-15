module Employers
  class ShowResolver
    attr_reader :params, :current_user

    def self.call(*args)
      new(*args).call
    end

    def initialize(_developer, args, ctx)
      raise StandardError, 'Unauthorised' unless ctx[:current_user].present?
      safe_params = args.instance_variable_get(:@original_values).to_h
      @params = HashWithIndifferentAccess.new(safe_params)
    end

    def call
      Employer.find_by_login!(params[:id])
    end
  end
end
