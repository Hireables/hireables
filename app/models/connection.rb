class Connection < ApplicationRecord
  include HttpClient
  include Stackoverflow
  include Linkedin
  include Github
  include Youtube

  belongs_to :developer, touch: true
  validates_presence_of :provider
  validates_uniqueness_of :provider

  def self.find_or_create_for_oauth(auth)
    ActiveRecord::Base.transaction do
      @connection ||= find_for_oauth(auth)
      @connection.nil? ? create_from_oauth(auth) : @connection
    end
  end

  def self.find_for_oauth(auth)
    where(uid: auth.uid, provider: auth.provider).first
  end

  def self.create_from_oauth(auth)
    create!(
      uid: auth.uid,
      provider: auth.provider,
      access_token: auth.credentials.token
    )
  end

  def owner?(user)
    user == developer
  end

  def expired?
    expiring.include?(provider) && Time.now.to_i > expires_at.to_i
  end

  def data_for(selection)
    provider_content.fetch(provider)
    content = data.detect { |item| item.id.to_s == selection.to_s  }
    send(provider_content.fetch(provider), content)
  end

  def repo(repo)
    {
      title: repo.name,
      description: repo.description,
      source: provider,
      category: provider_content.fetch(provider),
      date: repo.pushed_at,
      link: repo.html_url,
      meta: repo.to_attrs,
    }
  end

  def answer(answer)
    {
      title: answer.title,
      description: answer.body,
      source: provider,
      category: provider_content.fetch(provider),
      date: answer.creation_date,
      link: answer.link,
      meta: answer.to_attrs,
    }
  end

  def job(job)
    {
      title: job.title,
      description: job.summary,
      source: provider,
      category: provider_content.fetch(provider),
      date: Time.new(job.startDate.year.to_i, job.startDate.month.to_i),
      link: nil,
      meta: job.to_attrs,
    }
  end

  def talk(talk)
    {
      title: talk.title,
      description: talk.description,
      source: provider,
      category: provider_content.fetch(provider),
      date: talk.publishedAt,
      link: nil,
      meta: talk.to_attrs,
    }
  end

  def data
    send(provider_data_methods.fetch(provider))
  rescue KeyError
    'Unknown connection'
  end

  def provider_data_methods
    {
      'github' => 'fetch_repos',
      'stackoverflow' => 'fetch_answers',
      'linkedin' => 'fetch_positions',
      'youtube' => 'fetch_talks'
    }.freeze
  end

  def provider_content
    {
      'github' => 'repo',
      'stackoverflow' => 'answer',
      'linkedin' => 'job',
      'youtube' => 'talk'
    }.freeze
  end

  def expiring
    %w(stackoverflow linkedin youtube)
  end
end
