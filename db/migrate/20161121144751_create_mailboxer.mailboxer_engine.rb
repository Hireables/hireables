# This migration comes from mailboxer_engine (originally 20110511145103)
class CreateMailboxer < ActiveRecord::Migration
  def self.up
  #Tables
    #Conversations
    create_table :mailboxer_conversations do |t|
      t.column :subject, :string, :default => ""
      t.column :messages_count, :integer
      t.column :receipts_count, :integer
      t.column :created_at, :datetime, :null => false
      t.column :updated_at, :datetime, :null => false
    end

    #Receipts
    create_table :mailboxer_receipts do |t|
      t.references :receiver, :polymorphic => true
      t.column :notification_id, :integer, :null => false
      t.column :is_read, :boolean, :default => false
      t.column :trashed, :boolean, :default => false
      t.column :deleted, :boolean, :default => false
      t.column :mailbox_type, :string, :limit => 25
      t.column :messages_count, :integer
      t.column :notifications_count, :integer
      t.column :created_at, :datetime, :null => false
      t.column :updated_at, :datetime, :null => false
    end

    #Notifications and Messages
    create_table :mailboxer_notifications do |t|
      t.column :type, :string
      t.column :body, :text
      t.column :subject, :string, :default => ""
      t.references :sender, :polymorphic => true
      t.column :conversation_id, :integer
      t.column :receipts_count, :integer
      t.column :draft, :boolean, :default => false
      t.string :notification_code, :default => nil
      t.references :notified_object, :polymorphic => true
      t.references :message_object, :polymorphic => true
      t.column :attachment, :string
      t.column :updated_at, :datetime, :null => false
      t.column :created_at, :datetime, :null => false
      t.boolean :global, default: false
      t.datetime :expires
    end

  #Indexes
    #Conversations
    #Receipts
    add_index "mailboxer_receipts","notification_id"
    add_index :mailboxer_receipts, [:mailbox_type], name: 'sent_receipts', where: "mailbox_type = 'sentbox'"
    add_index :mailboxer_receipts, [:mailbox_type], name: 'inbox_receipts', where: "mailbox_type = 'inbox'"
    add_index :mailboxer_receipts, [:mailbox_type], name: 'trashed_receipts', where: "trashed = true AND deleted = false"
    add_index :mailboxer_receipts, [:trashed], name: 'not_trashed_receipts', where: "trashed = false"
    add_index :mailboxer_receipts, [:deleted], name: 'deleted_receipts', where: "deleted = true"
    add_index :mailboxer_receipts, [:is_read], name: 'read_receipts', where: "is_read = true"
    add_index :mailboxer_receipts, [:is_read], name: 'unread_receipts', where: "is_read = false"
    add_index :mailboxer_receipts, [:mailbox_type, :trashed, :deleted], name: 'all_inbox_receipts', where: "mailbox_type = 'inbox' AND trashed = false AND deleted = false"
    add_index :mailboxer_receipts, [:mailbox_type, :trashed, :deleted], name: 'all_sentbox_receipts', where: "mailbox_type = 'sentbox' AND trashed = false AND deleted = false"

    #Messages
    add_index "mailboxer_notifications","conversation_id"

  #Foreign keys
    #Conversations
    #Receipts
    add_foreign_key "mailboxer_receipts", "mailboxer_notifications", :name => "receipts_on_notification_id", :column => "notification_id"
    #Messages
    add_foreign_key "mailboxer_notifications", "mailboxer_conversations", :name => "notifications_on_conversation_id", :column => "conversation_id"
  end

  def self.down
  #Tables
    remove_foreign_key "mailboxer_receipts", :name => "receipts_on_notification_id"
    remove_foreign_key "mailboxer_notifications", :name => "notifications_on_conversation_id"

  #Indexes
    drop_table :mailboxer_receipts
    drop_table :mailboxer_conversations
    drop_table :mailboxer_notifications
  end
end
