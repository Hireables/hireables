class ImportConnectionDataWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'urgent', retry: 5

  # rubocop:disable Metrics/MethodLength
  # rubocop:disable Metrics/AbcSize
  def perform(connection_id)
    Developer.connection_pool.with_connection do
      connection = Connection.find(connection_id)
      connection.imports.delete_all
      connection.fetch_data.each do |item|
        connection.imports.create(
          developer: connection.developer,
          source_id: item.id,
          source_name: connection.provider,
          data: serializer.decode_hash(item.to_attrs)
        )
      end
    end

  rescue ActiveRecord::RecordNotFound
    'No connection found'

  ensure
    ActiveRecord::Base.clear_active_connections!
    ActiveRecord::Base.connection.close
  end

  def serializer
    Sawyer::Serializer.new('json')
  end
end
