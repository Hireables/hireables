class Developer < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :trackable, :validatable, :omniauthable


  def self.whitelisted_attributes
    all_attributes - protected_attributes
  end

  private

  def self.all_attributes
    self.columns.map(&:name).map(&:to_sym)
  end

  def self.protected_attributes
    [:access_token, :provider, :uid, :email]
  end

end
