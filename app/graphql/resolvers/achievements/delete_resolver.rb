module Achievements
  class DeleteResolver
    attr_reader :params, :current_developer

    def self.call(*args)
      new(*args).call
    end

    def initialize(_obj, inputs, ctx)
      raise StandardError, 'Unauthorised' unless ctx[:current_developer].present?
      @params = inputs
      @current_developer = ctx[:current_developer]
    end

    def call
      @achievement = Schema.object_from_id(inputs['id'], ctx)
      raise StandardError, 'Unauthorised' unless @achievement.developer == current_developer
      @achievement.destroy
      {  deletedId: params['id'] }
    end
  end
end
