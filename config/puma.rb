threads_count = ENV.fetch('RAILS_MAX_THREADS') { 25 }.to_i
threads threads_count, threads_count
port        ENV.fetch('PORT') { 3000 }
environment ENV.fetch('RAILS_ENV') { 'development' }
workers ENV.fetch('WEB_CONCURRENCY') { 2 }
preload_app!

before_fork do
  PumaWorkerKiller.config do |config|
    config.ram           = 512 # mb
    config.frequency     = 5 # seconds
    config.percent_usage = 0.95
    config.rolling_restart_frequency = 12 * 900
    config.reaper_status_logs = true
  end
  PumaWorkerKiller.start
end

on_worker_boot do
  ActiveRecord::Base.establish_connection if defined?(ActiveRecord)
  Que.mode = :async
end

plugin :tmp_restart
