# rubocop:disable Metrics/BlockLength
DeveloperType = GraphQL::ObjectType.define do
  name 'Developer'
  description 'Fetch developer associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :database_id, types.Int, 'The database id of this developer' do
    resolve -> (obj, _args, _ctx) { obj.id }
  end

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

  field :favourited, types.Boolean do
    description 'Is developer favourited by current employer?'
    resolve -> (obj, _args, ctx) { favourited?(obj, ctx) }
  end

  connection :achievements, AchievementType.connection_type do
    description 'Achievement connection to fetch paginated achievements.'
    resolve -> (obj, _args, ctx) { obj.achievements.nil? ? [] :  obj.achievements.order(id: :asc) }
  end

  field :connections, types[ConnectionType] do
    description 'Developer current connections'
    resolve -> (obj, _args, ctx) { obj.connections.nil? ? [] : obj.connections.order(id: :asc) }
  end

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

  field :orgs, types[OrgType] do
    description 'Repo connection to fetch developer orgs.'
    resolve -> (obj, _args, ctx) { resolve_orgs(obj, ctx) }
  end

  connection :repos, RepoType.connection_type do
    description 'Repo connection to fetch developer orgs.'
    resolve -> (obj, _args, ctx) { resolve_repos(obj, ctx) }
  end
end

def favourited?(obj, ctx)
  ctx[:current_employer] ? ctx[:current_employer].favourited?(obj) : false
end

def resolve_repos(obj, ctx)
  github_api(ctx)
    .fetch_developer_repos(obj.login)
    .lazy
    .sort_by(&:stargazers_count)
    .reverse!
    .to_a
end

def resolve_orgs(obj, ctx)
  github_api(ctx).fetch_developer_orgs(obj.login)
end

def resolve_platforms(obj, ctx)
  return obj.platforms unless obj.platforms.nil?
  github_api(ctx).fetch_developer_languages(obj.login)
end

def github_api(ctx)
  @github_api ||= Github::Api.new(github_access_token(ctx))
end

def github_access_token(ctx)
  if ctx[:current_recruiter].present?
    ctx[:current_recruiter].try(:access_token)
  elsif ctx[:current_developer].present?
    ctx[:current_developer].try(:github_access_token)
  else
    nil
  end
end
