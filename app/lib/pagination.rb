class Pagination

  def initialize(headers)
    @headers = headers
  end

  def build
    return nil unless @headers["link"].present?
    @links = @headers["link"].split(',')
    rels = []
    @links.each{|link|
      rels << {
        url: link.split(';').first.gsub('>', '').gsub('<', '').split('?').last,
        label: link.split(';').last.gsub('"', '').gsub('rel=', '').strip,
        id: SecureRandom.hex(6)
      }
    }
    rels
  end

end