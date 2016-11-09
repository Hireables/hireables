module Youtube
  extend ActiveSupport::Concern

  included do
    YOUTUBE_CHANNEL_URI = "https://www.googleapis.com/youtube/v3/channels".freeze
    YOUTUBE_PLAYLIST_URI = "https://www.googleapis.com/youtube/v3/playlistItems".freeze
    YOUTUBE_VIDEO_URI = "https://www.googleapis.com/youtube/v3/videos".freeze
  end

  def fetch_talks
    agent = Sawyer::Agent.new("#{YOUTUBE_CHANNEL_URI}?#{youtube_query_params}&mine=true", faraday: client
    ) do |http|
      http.headers['content-type'] = 'application/json'
    end
    root = agent.start
    playlist = root.data.items
    uploadPlaylist = playlist.first.contentDetails.relatedPlaylists.uploads
    agent2 = Sawyer::Agent.new("#{YOUTUBE_PLAYLIST_URI}?#{youtube_query_params}&playlistId=#{uploadPlaylist}", faraday: client
    ) do |http|
      http.headers['content-type'] = 'application/json'
    end
    root2 = agent2.start
    videoIds = root2.data.items.map{|item| item.contentDetails.videoId }.join(',')

    agent3 = Sawyer::Agent.new("#{YOUTUBE_VIDEO_URI}?#{youtube_query_params}&id=#{videoIds}", faraday: client
    ) do |http|
      http.headers['content-type'] = 'application/json'
    end
    root3 = agent3.start
    root3.data
  end

  private

  def youtube_query_params
    {
      access_token: access_token,
      part: 'contentDetails'
    }.to_query
  end
end
