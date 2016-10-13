module Github
  class Params
    attr_reader :params

    def initialize(params = {})
      @params = params
    end

    def set
      query = request_params.map do |param, value|
        "#{param}:#{value}" if valid?(param) && value.present?
      end.compact.join('+').gsub(/\s+/, '')

      query << "&page=#{params["page"] || 1}&per_page=21"
    end

    def request_params
      params.map do |param, value|
        valid?(param) && value.present?
      end.any? ?  params : default_params
    end

    def valid?(key)
      supported.include?(key.to_s)
    end

    def supported
      %w(language fullname location followers repos)
    end

    private

    def default_params
      { followers: '>10', repos: '>10' }
    end
  end
end
