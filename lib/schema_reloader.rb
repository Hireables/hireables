require 'digest/md5'
class SchemaReloader
  delegate :changed?, to: :class
  delegate :checksum, to: :class

  def initialize(app)
    @app = app
  end

  def call(env)
    Schema.dump_schema
    @app.call(env)
  end
end
