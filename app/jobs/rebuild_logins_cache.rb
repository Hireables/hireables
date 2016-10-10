class RebuildLoginsCache < ActiveJob::Base
  queue_as :urgent

  def perform
    REDIS.del('hireables:developers_logins')
    Developer.find_each do |developer|
      REDIS.sadd('hireables:developers_logins', developer.login)
    end
  end
end
