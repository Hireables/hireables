AnswerType = GraphQL::ObjectType.define do
  name 'Answer'
  description 'Fetch Answer associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :answer_id

  field :id, !types.ID, 'id of this answer' do
    resolve -> (obj, _args, ctx) { obj.answer_id }
  end
  field :title, types.String, 'title of this answer'
  field :body, types.String, 'Description of this answer'
  field :accepted, types.Boolean, 'Is answer accepted?'
  field :comment_count, types.Int, 'Comments count of this answer'
  field :creation_date, types.String, 'Date when this answer was created'
  field :up_vote_count, types.String, 'Total up votes'
  field :link, types.String, 'Link to answer'
  field :pinned, types.Boolean, 'Is answer pinned?' do
    resolve -> (obj, _args, ctx) {
      ctx[:current_developer].pinned_answers.member?(obj.title)
    }
  end
end
