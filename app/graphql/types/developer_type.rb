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
    description 'Is developer hireable?'
    resolve -> (obj, args, ctx) do
      obj.hireable.nil? ? false :  obj.hireable
    end
  end

  field :linkedin, types.String do
    description 'Linkedin profile'
    resolve -> (obj, args, ctx) do
      obj.respond_to?(:linkedin) ?  obj.linkedin : nil
    end
  end

  field :followers, types.Int, 'The followers of this developer'
  field :public_gists, types.Int, 'The gists of this developer'
  field :public_repos, types.Int, 'The repos of this developer'

  field :remote, types.Boolean do
    description 'Prefer remote?'
    resolve -> (obj, args, ctx) do
      obj.respond_to?(:remote) ?  obj.remote : false
    end
  end

  field :relocate, types.Boolean do
    description 'Can relocate?'
    resolve -> (obj, args, ctx) do
      obj.respond_to?(:relocate) ?  obj.relocate : false
    end
  end

  field :premium, types.Boolean do
    description 'Is it premium profile?'
    resolve -> (obj, args, ctx) do
      obj.respond_to?(:premium) ?  obj.premium : false
    end
  end

  field :subscribed, types.Boolean do
    description 'Is developer subcribed to emails from recruiters?'
    resolve -> (obj, args, ctx) do
      obj.respond_to?(:subscribed) ?  obj.subscribed : false
    end
  end

  field :platforms, types[types.String] do
    description 'Languages or platforms interested in'
    resolve -> (obj, args, ctx) do
      api = Github::Api.new(ctx[:current_user].try(:id))
      api.token = ctx[:current_user].access_token unless ctx[:current_user].nil?
      api.fetch_developer_languages(obj.login)
    end
  end
end
