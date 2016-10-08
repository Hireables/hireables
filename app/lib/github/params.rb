module Github
  class Params
    attr_reader :params

    def initialize(params)
      @params = params
    end

    def set
      params.map do |key, value|
        "#{key}:#{value}" if valid_query_params.include?(key) && value.present?
      end.compact.join('+').gsub(/\s+/, '')
    end

    private

    def valid_query_params
      %w(language fullname location followers repos)
    end
  end
end
