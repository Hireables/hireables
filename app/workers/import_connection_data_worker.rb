class ImportConnectionDataWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'urgent', retry: 5

  # rubocop:disable Metrics/MethodLength
  # rubocop:disable Metrics/AbcSize
  def perform(connection_id)
    connection = Connection.find(connection_id)
    connection.imports.delete_all

    Import.connection_pool.with_connection do
      connection.fetch_data.each do |item|
        date_field = date_fields.detect { |field| item.key?(field) }
        ActiveRecord::Base.transaction do
          connection.imports.create(
            developer: connection.developer,
            source_id: item['id'],
            created_at: item[date_field],
            source_name: connection.provider,
            data: item
          )
        end
      end
    end

  rescue ActiveRecord::RecordNotFound
    'No connection found'

  ensure
    ActiveRecord::Base.clear_active_connections!
    ActiveRecord::Base.connection.close
  end

  def date_fields
    %w(creation_date startDate publishedAt pushed_at)
  end
end
