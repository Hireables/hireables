class UpdateAchievementJob < Que::Job
  def run
    ActiveRecord::Base.transaction do
      Achievement.includes(:import).find_each do |achievement|
        achievement.data = achievement.import.data
        achievement.save!
      end
      destroy
    end
  end
end
