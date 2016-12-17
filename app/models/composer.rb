ComposerId = Struct.new :id
class Composer < ComposerId
  STATIC = new(id: 'root').freeze

  def self.find(_)
    STATIC
  end
end
