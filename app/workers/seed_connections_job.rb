class SeedConnectionsJob < Que::Job
  def run(developer_id)
    developer = Developer.find(developer_id)
    ActiveRecord::Base.transaction do
      allowed_connections.each do |connection|
        developer.connections.create!(provider: connection)
      end
      destroy
    end

  rescue ActiveRecord::RecordNotFound
    'No connection found'
  end

  def allowed_connections
    %w(stackoverflow producthunt linkedin meetup youtube)
  end
end
