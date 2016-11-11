module Developers
  class ToggleAchievementResolver
    attr_reader :params, :current_developer

    def self.call(*args)
      new(*args).call
    end

    def initialize(_obj, inputs, ctx)
      raise StandardError, 'Unauthorised' unless ctx[:current_developer].present?
      @current_developer = ctx[:current_developer]
      safe_params = inputs.instance_variable_get(:@original_values).to_h
      @params = HashWithIndifferentAccess.new(safe_params)
    end

    def call
      raise StandardError, 'Unauthorised' unless connection.owner?(current_developer)
      @import = current_developer.imports.where(source_id: params[:selection]).first
      @import.update!(pinned: !@import.pinned?)
      { developer: current_developer.reload }
    end
  end
end
