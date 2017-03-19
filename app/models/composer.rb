ComposerId = Struct.new :id
class Composer < ComposerId
  STATIC = new(id: 'composer').freeze

  def self.find(_)
    STATIC
  end
end
