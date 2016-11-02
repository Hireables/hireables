# rubocop:disable Metrics/BlockLength
DeveloperType = GraphQL::ObjectType.define do
  name 'Developer'
  description 'Fetch developer associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  # About
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

  field :premium, types.Boolean do
    description 'Is it premium profile?'
    resolve(DeveloperCustomFieldResolver.new(:premium, :boolean))
  end

  field :platforms, types[types.String] do
    description 'Languages or platforms interested in'
    resolve -> (obj, _args, ctx) { resolve_platforms(obj, ctx) }
  end

  field :linkedin, types.String do
    description 'Linkedin profile'
    resolve(DeveloperCustomFieldResolver.new(:linkedin, :string))
  end

  # Availability
  field :hireable, types.Boolean do
    description 'Is developer hireable?'
    resolve -> (obj, _args, _ctx) { obj.hireable.nil? ? false : obj.hireable }
  end

  # Preferences
  field :remote, types.Boolean do
    description 'Prefer remote?'
    resolve(DeveloperCustomFieldResolver.new(:remote, :boolean))
  end

  field :relocate, types.Boolean do
    description 'Can relocate?'
    resolve(DeveloperCustomFieldResolver.new(:relocate, :boolean))
  end

  # Job types
  field :full_time, types.Boolean do
    description 'Full-Time work'
    resolve(DeveloperCustomFieldResolver.new(:full_time, :boolean))
  end

  field :part_time, types.Boolean do
    description 'Part-Time work'
    resolve(DeveloperCustomFieldResolver.new(:part_time, :boolean))
  end

  field :contract, types.Boolean do
    description 'Contract work'
    resolve(DeveloperCustomFieldResolver.new(:contract, :boolean))
  end

  field :freelance, types.Boolean do
    description 'Freelance work'
    resolve(DeveloperCustomFieldResolver.new(:freelance, :boolean))
  end

  field :internship, types.Boolean do
    description 'Internship work'
    resolve(DeveloperCustomFieldResolver.new(:internship, :boolean))
  end

  field :startup, types.Boolean do
    description 'Startup work'
    resolve(DeveloperCustomFieldResolver.new(:startup, :boolean))
  end

  # Levels
  field :cto, types.Boolean do
    description 'CTO level'
    resolve(DeveloperCustomFieldResolver.new(:cto, :boolean))
  end

  field :lead, types.Boolean do
    description 'Lead level'
    resolve(DeveloperCustomFieldResolver.new(:lead, :boolean))
  end

  field :senior, types.Boolean do
    description 'Senior level'
    resolve(DeveloperCustomFieldResolver.new(:senior, :boolean))
  end

  field :mid, types.Boolean do
    description 'Mid-level level'
    resolve(DeveloperCustomFieldResolver.new(:mid, :boolean))
  end

  field :junior, types.Boolean do
    description 'Junior level'
    resolve(DeveloperCustomFieldResolver.new(:junior, :boolean))
  end

  field :student, types.Boolean do
    description 'Student level'
    resolve(DeveloperCustomFieldResolver.new(:student, :boolean))
  end

  field :repos, types[RepoType] do
    description 'Repo connection to fetch developer repos.'
    resolve -> (obj, _args, ctx) { resolve_repos(obj, ctx) }
  end

  field :orgs, types[OrgType] do
    description 'Repo connection to fetch developer orgs.'
    resolve -> (obj, _args, ctx) { resolve_orgs(obj, ctx) }
  end
end

def resolve_orgs(obj, ctx)
  return obj.orgs unless obj.orgs.nil?
  api = Github::Api.new(ctx[:current_user].try(:access_token))
  api.fetch_developer_orgs(obj.login)
end

def resolve_repos(obj, ctx)
  return obj.repos unless obj.repos.nil?
  api = Github::Api.new(ctx[:current_user].try(:access_token))
  api.fetch_top_developer_repos(obj.login)
end

def resolve_platforms(obj, ctx)
  return obj.platforms unless obj.platforms.nil?
  api = Github::Api.new(ctx[:current_user].try(:access_token))
  api.fetch_developer_languages(obj.login)
end
