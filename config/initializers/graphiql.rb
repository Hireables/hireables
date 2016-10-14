if Rails.env.development?
  GraphiQL::Rails.config.headers['Authorization'] = -> (context) {
    "bearer #{context.cookies.signed['_api_token']}"
  }
end
