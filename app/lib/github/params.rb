module Github
  class Params
    attr_reader :params

    def initialize(params)
      @params = params
    end

    def set
      params.map do |param, value|
        "#{param}:#{value}" if valid?(param) && value.present?
      end.compact.join('+').gsub(/\s+/, '')
    end

    def valid?(key)
      supported.include?(key.to_s)
    end

    def supported
      %w(language fullname location followers repos)
    end
  end
end
