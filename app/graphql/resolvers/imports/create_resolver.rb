module Imports
  class CreateResolver
    attr_reader :connection, :params, :current_developer

    def self.call(*args)
      new(*args).call
    end

    def initialize(_obj, inputs, ctx)
      raise StandardError, 'Unauthorised' unless ctx[:current_developer].present?
      @connection = Schema.object_from_id(inputs['id'], ctx)
      @current_developer = ctx[:current_developer]
      safe_params = inputs.instance_variable_get(:@original_values).to_h
      @params = HashWithIndifferentAccess.new(safe_params)
    end

    def call
      raise StandardError, 'Unauthorised' unless connection.owner?(current_developer)

      selection = connection.data.detect do |item|
        item.id.to_s == params[:selection]
      end

      selection = Connection.where('data @> ?', '[{"id":  45273714}]').first
      import = current_developer.imports.create(
        data: selection,
        source_id: selection.id.to_s,
        source_name: connection.provider,
      )

      imports_connection = GraphQL::Relay::RelationConnection.new(
        current_developer.imports,
        {}
      )

      edge = GraphQL::Relay::Edge.new(import, imports_connection)
      { importEdge: edge }
    end
  end
end
