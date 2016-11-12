module Youtube
  extend ActiveSupport::Concern

  included do
    YOUTUBE_BASE_URI = 'https://www.googleapis.com/youtube/v3'.freeze
    YOUTUBE_VIDEO_URI = "#{YOUTUBE_BASE_URI}/videos".freeze
    YOUTUBE_SEARCH_URI = "#{YOUTUBE_BASE_URI}/search".freeze
  end

  def fetch_talks
    Rails.cache.fetch(self) do
      videos, agent = fetch_videos
      return [] if videos.nil?
      videos.map do |video|
        video_hash = video.to_attrs.except(:snippet, :statistics)
        video_hash.merge!(video[:snippet]).merge!(video[:statistics])
        Sawyer::Resource.new(agent, video_hash)
      end
    end
  end

  private

  def fetch_videos
    return [] if video_ids.nil?
    agent = initialize_agent("#{YOUTUBE_VIDEO_URI}?#{video_params}")
    root = agent.start
    videos = root.data.items
    [videos, agent]
  end

  def video_ids
    agent = initialize_agent("#{YOUTUBE_SEARCH_URI}?#{search_params}")
    root = agent.start
    videos = root.data.items
    videos.map { |video| video.id.videoId }.join(',')
  end

  def search_params
    token_param.merge(
      maxResults: 20,
      part: 'snippet',
      forMine: true,
      order: 'viewCount',
      type: 'video'
    ).to_query
  end

  def video_params
    token_param.merge(part: 'snippet,statistics', id: video_ids).to_query
  end

  def token_param
    { access_token: access_token }
  end
end
