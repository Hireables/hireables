threads_count = ENV.fetch('RAILS_MAX_THREADS') { 25 }.to_i
threads threads_count, threads_count
port        ENV.fetch('PORT') { 3000 }
environment ENV.fetch('RAILS_ENV') { 'development' }
workers ENV.fetch('WEB_CONCURRENCY') { 2 }
preload_app!

if Rails.env.production?
  before_fork do
    PumaWorkerKiller.config do |config|
      config.ram           = 512 # mb
      config.frequency     = 20 # seconds
      config.percent_usage = 0.95
      config.rolling_restart_frequency = 12 * 900
      config.reaper_status_logs = true
    end
    PumaWorkerKiller.start
  end
end

on_worker_boot do
  ActiveRecord::Base.establish_connection if defined?(ActiveRecord)
  Que.mode = :async
end

unless Rails.env.production?
  options = { addr: ENV['NGROK_PORT'] }
  if File.file? '.ngrok'
    options[:config] = '.ngrok'
  elsif File.file? ENV['HOME'] + '/.ngrok'
    options[:config] = ENV['HOME'] + '/.ngrok'
  end

  options[:inspect] = ENV['NGROK_INSPECT'] if ENV['NGROK_INSPECT']
  puts '[NGROK] tunneling at ' + Ngrok::Tunnel.start(options)
  unless ENV['NGROK_INSPECT'] == 'false'
    puts '[NGROK] inspector web interface listening at http://127.0.0.1:4040'
  end
end

plugin :tmp_restart
