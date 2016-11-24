ReceiptType = GraphQL::ObjectType.define do
  name 'Receipt'
  description 'Fetch conversation receipt associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :receiver, -> { ParticipantType }, 'Receiver of this receipt'
  field :message, -> { MessageType }, 'Receipt message'
  field :notification_id, types.Int, 'Notification id'
  field :is_read, types.Boolean, 'Is receipt read?'
  field :not_deleted, types.Boolean, 'Is receipt not deleted?'
  field :trash, types.Boolean, 'Is receipt trashed?'
  field :not_trash, types.Boolean, 'Is receipt not trashed?'
  field :deleted, types.Boolean, 'Is receipt deleted?'
  field :mailbox_type, types.String, 'Receipt mailbox'
  field :created_at, types.String, 'Receipt date'
end
