class SetDeveloperPremiumWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'critical', retry: 5

  def perform(id)
    # Update developer in a transaction block
    Developer.connection_pool.with_connection do |conn|
      developer = Developer.find(id)
      developer.update!(premium: true)
    end
  end
end
