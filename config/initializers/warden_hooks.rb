Warden::Manager.after_set_user do |user, auth, opts|
  scope = opts[:scope]
  auth.cookies.signed["#{scope}.login"] = user.login
  auth.cookies.signed["#{scope}.expires_at"] = 30.minutes.from_now
end

# Cleanup once logged out
Warden::Manager.before_logout do |user, auth, opts|
  scope = opts[:scope]
  auth.cookies.signed["#{scope}.login"] = nil
  auth.cookies.signed["#{scope}.expires_at"] = nil
end
