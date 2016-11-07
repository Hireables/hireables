Id = Struct.new :id
class Viewer < Id
  STATIC = new(id: 'root').freeze

  def self.find_by_login(_)
    STATIC
  end
end
