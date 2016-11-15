class ImportConnectionDataJob < Que::Job
  # rubocop:disable Metrics/MethodLength
  # rubocop:disable Metrics/AbcSize
  def run(connection_id)
    ActiveRecord::Base.transaction do
      connection = Connection.find(connection_id)
      connection.fetch_data.each do |item|
        date_field = date_fields.detect { |field| item.key?(field) }
        import = connection.imports.where(
          developer: connection.developer,
          source_id: item['id'],
          source_name: connection.provider
        ).first_or_initialize
        import.data = item
        import.created_at = item[date_field] if import.new_record?
        import.save!
      end
      connection.update!(importing: false)
      destroy
    end

  rescue ActiveRecord::RecordNotFound
    'No connection found'
  end

  def date_fields
    %w(creation_date startDate publishedAt pushed_at)
  end
end
