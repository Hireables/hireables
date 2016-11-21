class PagesController < ApplicationController
  layout 'pages', except: :index

  def index
    @title = 'Tech employers meets hireable developers'
    @subtitle = "
      Hireables leverages Github API to enable developers
      extend their Github profiles and tech employers
      find real hireables.
    "
  end

  def privacy_policy
    @title = 'Privacy Policy'
    @subtitle = 'How we protect and use your private data'
  end

  def cookies_policy
    @title = 'Cookies Policy'
    @subtitle = 'What private data we store and why'
  end
end
