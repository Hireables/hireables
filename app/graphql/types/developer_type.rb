# rubocop:disable Metrics/BlockLength
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
  field :followers, types.Int, 'The followers of this developer'
  field :public_gists, types.Int, 'The gists of this developer'
  field :public_repos, types.Int, 'The repos of this developer'

  field :hireable, types.Boolean do
    description 'Is developer hireable?'
    resolve(DeveloperCustomFieldResolver.new(:hireable, :boolean))
  end

  field :linkedin, types.String do
    description 'Linkedin profile'
    resolve(DeveloperCustomFieldResolver.new(:hireable, :string))
  end

  field :remote, types.Boolean do
    description 'Prefer remote?'
    resolve(DeveloperCustomFieldResolver.new(:remote, :boolean))
  end

  field :relocate, types.Boolean do
    description 'Can relocate?'
    resolve(DeveloperCustomFieldResolver.new(:relocate, :boolean))
  end

  field :premium, types.Boolean do
    description 'Is it premium profile?'
    resolve(DeveloperCustomFieldResolver.new(:premium, :boolean))
  end

  field :subscribed, types.Boolean do
    description 'Is developer subcribed to emails from recruiters?'
    resolve(DeveloperCustomFieldResolver.new(:subscribed, :boolean))
  end

  field :platforms, types[types.String] do
    description 'Languages or platforms interested in'
    resolve -> (obj, _args, ctx) { resolve_platforms(obj, ctx) }
  end
end

def resolve_platforms(obj, ctx)
  api = Github::Api.new
  api.fetch_developer_languages(obj.login)
end
