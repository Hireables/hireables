class MailboxesController < ApplicationController
  layout 'mailbox'
  before_action :authenticate_user!

  def show
    @type = params[:id]
  end
end
