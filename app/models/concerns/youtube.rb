module Youtube
  extend ActiveSupport::Concern

  included do
    YOUTUBE_BASE_URI = 'https://www.googleapis.com/youtube/v3'.freeze
    YOUTUBE_VIDEO_URI = "#{YOUTUBE_BASE_URI}/videos".freeze
    YOUTUBE_SEARCH_URI = "#{YOUTUBE_BASE_URI}/search".freeze
  end

  def fetch_talks
    Rails.cache.fetch(self) do
      videos = fetch_videos
      return [] if videos.nil?
      videos.map do |video|
        new_video_hash = video.except('snippet', 'statistics')
        new_video_hash['category'] = 'talk'
        new_video_hash.merge!(video['snippet']).merge!(video['statistics'])
      end
    end
  end

  private

  def fetch_videos
    return [] if video_ids.nil?
    response = client.get("#{YOUTUBE_VIDEO_URI}?&#{video_params}", headers)
    JSON.parse(response.body)['items']
  rescue JSON::ParserError
    { 'items': [] }
  end

  def video_ids
    response = client.get("#{YOUTUBE_SEARCH_URI}?&#{search_params}", headers)
    items = JSON.parse(response.body)['items']
    return [] if items.nil?
    items.map { |item| item['id']['videoId'] }.join(',')
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
