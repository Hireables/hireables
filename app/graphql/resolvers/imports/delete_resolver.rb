module Imports
  class DeleteResolver
    attr_reader :params, :current_developer, :ctx

    def self.call(*args)
      new(*args).call
    end

    def initialize(_obj, inputs, ctx)
      raise StandardError, 'Unauthorised' unless ctx[:current_developer].present?
      @params = inputs
      @ctx = ctx
      @current_developer = ctx[:current_developer]
    end

    def call
      @import = Schema.object_from_id(params['id'], ctx)
      raise StandardError, 'Unauthorised' unless @import.developer == current_developer
      @import.destroy
      {  deletedId: params['id'], developer: current_developer }
    end
  end
end
