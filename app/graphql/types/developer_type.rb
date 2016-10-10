DeveloperType = GraphQL::ObjectType.define do
  name 'Developer'
  description 'Fetch developer associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :login, types.String, 'The login of this developer'
  field :name, types.String, 'The name of this developer'
  field :email, types.String, 'The email of this developer'
  field :bio, types.String, 'The bio of this developer'
  field :avatar_url, types.String, 'The avatar of this developer'
  field :company, types.String, 'The company of this developer'
  field :location, types.String, 'The location of this developer'
  field :blog, types.String, 'The blog website of this developer'
  field :html_url, types.String, 'The github url of this developer'

  field :hireable, types.Boolean do
    description 'Is developer hireable'
    resolve -> (obj, args, ctx) do
      obj.hireable.nil? ? false :  obj.hireable
    end
  end

  field :followers, types.Int, 'The followers of this developer'
  field :public_gists, types.Int, 'The gists of this developer'
  field :public_repos, types.Int, 'The repos of this developer'

  field :remote, types.Boolean do
    description 'The followers of this developer'
    resolve -> (obj, args, ctx) do
      obj.respond_to?(:remote) ?  obj.remote : false
    end
  end

  field :available, types.Boolean do
    description 'The followers of this developer'
    resolve -> (obj, args, ctx) do
      obj.respond_to?(:available) ?  obj.available : false
    end
  end

  field :jobs, types[types.String] do
    description 'The followers of this developer'
    resolve -> (obj, args, ctx) do
      obj.respond_to?(:jobs) ?  obj.jobs : []
    end
  end

  field :platforms, types[types.String] do
    description 'The followers of this developer'
    resolve -> (obj, args, ctx) do
      obj.respond_to?(:platforms) ?  obj.platforms : []
    end
  end

  field :city, types.String do
    description 'The followers of this developer'
    resolve -> (obj, args, ctx) do
      obj.respond_to?(:city) ?  obj.city : obj.location
    end
  end
end

def fetch_languages(username)
  Rails.cache.fetch([username, 'languages'], expires_in: 2.days) do
    request = Github::Api.new("/users/#{username}/repos").fetch
    Github::Response.new(request.parsed_response).developer_languages_collection
  end
end
