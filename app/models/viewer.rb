Id = Struct.new :login
class Viewer < Id
  STATIC = new(login: 'root').freeze

  def self.find_by_login(_)
    STATIC
  end
end
