DeveloperType = GraphQL::ObjectType.define do
  name 'Developer'
  description 'Fetch developer associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :database_id, types.Int, 'The database id of this developer' do
    resolve ->(obj, _args, _ctx) { obj.id }
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
    resolve ->(obj, _args, ctx) { favourited?(obj, ctx) }
  end

  field :is_owner, types.Boolean do
    description 'Is current user owner?'
    resolve ->(obj, _args, ctx) do
      ctx[:current_developer].present? &&
        ctx[:current_developer].id == obj.id
    end
  end

  connection :achievements, ImportType.connection_type do
    description 'Achievement connection to fetch paginated achievements.'
    resolve ->(obj, _args, _ctx) { resolve_achievements(obj) }
  end

  field :connections, types[ConnectionType] do
    description 'Developer current connections'
    resolve ->(obj, _args, _ctx) { resolve_connections(obj) }
  end

  field :premium, types.Boolean do
    description 'Is it premium profile?'
    resolve(Developers::CustomFieldResolver.new(:premium, :boolean))
  end

  field :languages, types[types.String] do
    description 'Languages works with'
    resolve ->(obj, _args, ctx) { resolve_languages(obj, ctx) }
  end

  # Availability
  field :hireable, types.Boolean do
    description 'Is developer hireable?'
    resolve ->(obj, _args, _ctx) { obj.hireable.nil? ? false : obj.hireable }
  end

  # Preferences
  field :remote, types.Boolean do
    description 'Prefer remote?'
    resolve(Developers::CustomFieldResolver.new(:remote, :boolean))
  end

  field :relocate, types.Boolean do
    description 'Can relocate?'
    resolve(Developers::CustomFieldResolver.new(:relocate, :boolean))
  end

  # Job types
  field :full_time, types.Boolean do
    description 'Full-Time work'
    resolve(Developers::CustomFieldResolver.new(:full_time, :boolean))
  end

  field :part_time, types.Boolean do
    description 'Part-Time work'
    resolve(Developers::CustomFieldResolver.new(:part_time, :boolean))
  end

  field :contract, types.Boolean do
    description 'Contract work'
    resolve(Developers::CustomFieldResolver.new(:contract, :boolean))
  end

  field :freelance, types.Boolean do
    description 'Freelance work'
    resolve(Developers::CustomFieldResolver.new(:freelance, :boolean))
  end

  field :internship, types.Boolean do
    description 'Internship work'
    resolve(Developers::CustomFieldResolver.new(:internship, :boolean))
  end

  field :startup, types.Boolean do
    description 'Startup work'
    resolve(Developers::CustomFieldResolver.new(:startup, :boolean))
  end

  # Levels
  field :cto, types.Boolean do
    description 'CTO level'
    resolve(Developers::CustomFieldResolver.new(:cto, :boolean))
  end

  field :lead, types.Boolean do
    description 'Lead level'
    resolve(Developers::CustomFieldResolver.new(:lead, :boolean))
  end

  field :senior, types.Boolean do
    description 'Senior level'
    resolve(Developers::CustomFieldResolver.new(:senior, :boolean))
  end

  field :mid, types.Boolean do
    description 'Mid-level level'
    resolve(Developers::CustomFieldResolver.new(:mid, :boolean))
  end

  field :junior, types.Boolean do
    description 'Junior level'
    resolve(Developers::CustomFieldResolver.new(:junior, :boolean))
  end

  field :student, types.Boolean do
    description 'Student level'
    resolve(Developers::CustomFieldResolver.new(:student, :boolean))
  end

  field :orgs, types[OrgType] do
    description 'Repo connection to fetch developer orgs.'
    resolve ->(obj, _args, ctx) { resolve_orgs(obj, ctx) }
  end
end

def resolve_achievements(obj)
  return [] if obj.achievements.nil?
  obj.achievements.order(created_at: :desc)
end

def resolve_connections(obj)
  return [] if obj.connections.nil?
  obj.connections.order(id: :desc)
end

def favourited?(obj, ctx)
  ctx[:current_employer] ? ctx[:current_employer].favourited?(obj) : false
end

def resolve_orgs(obj, ctx)
  github_api(ctx).fetch_developer_orgs(obj.login)
end

def resolve_languages(obj, ctx)
  return obj.languages unless obj.languages.nil?
  languages = github_api(ctx).fetch_developer_languages(obj.login)
  languages.nil? ? [] : languages
end

def github_api(ctx)
  @github_api ||= Github::Api.new(token(ctx))
end

def token(ctx)
  @token ||= if ctx[:current_developer].present?
               ctx[:current_developer].github_access_token
             elsif ctx[:current_employer].present?
               ctx[:current_employer].try(:access_token)
             end
end
