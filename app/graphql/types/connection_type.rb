ConnectionType = GraphQL::ObjectType.define do
  name 'Connection'
  description 'Fetch Connection associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :provider, types.String, 'title of this achievement'
  field :connected, types.Boolean, 'Is this account connected?' do
    resolve -> (obj, _args, ctx) { obj.access_token.present? }
  end

  connection :answers, AnswerType.connection_type do
    description 'Answers connection to fetch stackoverflow answers.'
    resolve -> (obj, _args, ctx) { obj.fetch_answers }
  end

  connection :repos, RepositoryType.connection_type do
    description 'Repo connection to fetch github repos.'
    resolve -> (obj, _args, ctx) { obj.fetch_repos }
  end

  connection :positions, PositionType.connection_type do
    description 'Position connection to fetch linkedin positions.'
    resolve -> (obj, _args, ctx) { obj.fetch_positions }
  end

  connection :talks, VideoType.connection_type do
    description 'Position connection to fetch youtube talks.'
    resolve -> (obj, _args, ctx) { obj.fetch_talks }
  end
end
