class SeedConnectionsJob < Que::Job
  def run(developer_id)
    developer = Developer.find(developer_id)
    ActiveRecord::Base.transaction do
      allowed_connections.each do |connection|
        developer.connections.where(provider: connection).first_or_create
      end
      destroy
    end

  rescue ActiveRecord::RecordNotFound
    'No connection found'
  end

  def allowed_connections
    %w(linkedin stackoverflow producthunt medium youtube meetup)
  end
end
