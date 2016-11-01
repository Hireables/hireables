class PagesController < ApplicationController
  layout 'pages', except: :index

  def index
    @title = "Search hireables without noise"
    @subtitle = "
      Hireables is a tiny platform on top of Github API
      that enables developers to extend their Github profiles and
      employers search real hireables.
    "
  end

  def privacy_policy
    @title = "Privacy Policy"
    @subtitle = "How we protect and use your private data"
  end

  def cookies_policy
    @title = "Cookies Policy"
    @subtitle = "What private data we store and why"
  end
end
