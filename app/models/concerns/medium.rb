module Medium
  extend ActiveSupport::Concern

  included do
    MEDIUM_URI = 'https://medium.com'.freeze
    CDN_URL = 'https://cdn-images-1.medium.com/max/600/'.freeze
  end

  def fetch_posts
    posts = []
    posts_payload['payload']['references']['Post'].lazy.each do |_id, post|
      post.tap do |obj|
        obj['category']    = 'post'
        obj['description'] = obj['content']['subtitle']
        obj['recommends']  = obj['virtuals']['recommends']

        obj['cover']     = CDN_URL + obj['virtuals']['previewImage']['imageId']
        obj['mediumUrl'] = MEDIUM_URI + '/' + uid + '/' + obj['uniqueSlug']
        obj['created']   = Time.at(obj['createdAt'] / 1000).utc
      end
      post = HashWithIndifferentAccess.new(post.to_hash).except!(*mm_excluded_fields)
      posts << post
    end
    posts
  rescue NoMethodError
    []
  end

  private

  def posts_payload
    Rails.cache.fetch(self) do
      response = client.get("#{MEDIUM_URI}/#{uid}/latest?#{mm_params}")
      JSON.parse(response.body.gsub!('])}while(1);</x>', ''))
    end
  rescue JSON::ParserError
    []
  end

  def mm_params
    {
      format: 'json',
      limit: 50
    }.to_query
  end

  def mm_excluded_fields
    %w(
      versionId creatorId homeCollectionId detectedLanguage
      latestVersion latestPublishedVersion hasUnpublishedEdits latestRev
      updatedAt acceptedAt firstPublishedAt latestPublishedAt
      translationSourcePostId translationSourceCreatorId
      isApprovedTranslation inResponseToPostId inResponseToRemovedAt
      canonicalUrl approvedHomeCollectionId newsletterId webCanonicalUrl
      migrationId notifyFollowers notifyTwitter isSponsored
      isRequestToPubDisabled notifyFacebook responseHiddenOnParentPostAt
    )
  end
end
