class ConnectOauthResolver
  attr_reader :provider, :params

  def self.call(*args)
    new(*args).call
  end

  def initialize(_developer, args, ctx)
    raise StandardError,
          'You are not logged in' unless ctx[:current_developer].present?
    @current_developer = ctx[:current_developer]
    safe_params = args.instance_variable_get(:@original_values).to_h
    @params = HashWithIndifferentAccess.new(safe_params)
    @provider = params[:provider]
  end

  def call
    send(provider)
  end

  def linkedin
    linkedin_auth = JSON.parse(ctx[:cookies]["linkedin_oauth_#{ENV['LINKEDIN_CLIENT_ID']}"])
    consumer = linkedin_client.consumer
    token = consumer.get_access_token(nil, {}, {
      'xoauth_oauth2_access_token' => linkedin_auth['access_token']
    });

    linkedin_client.authorize_from_access(token.token, token.secret)
    user = linkedin_client.profile({
      fields: ['id', 'positions']
    })

    @connection = current_developer.connections.where(provider: provider).first
    @connection.update!(uid: user.id, access_token: token)
  end

  private

  def linkedin_client
    LinkedIn::Client.new(
      ENV.fetch('LINKEDIN_CLIENT_ID'),
      ENV.fetch('LINKEDIN_CLIENT_SECRET')
    )
  end
end
