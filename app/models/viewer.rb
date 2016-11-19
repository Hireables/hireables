Id = Struct.new :id
class Viewer < Id
  STATIC = new(id: 'root').freeze

  def self.find(_)
    STATIC
  end
end
