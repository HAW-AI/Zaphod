source 'https://rubygems.org'

gem 'rails', '3.2.17'
gem 'sorcery', git: 'https://github.com/patrickdet/sorcery.git', branch: 'stateless_auth_token'
gem 'bcrypt-ruby'
gem 'cancan'
gem 'inherited_resources'

gem 'sqlite3'

gem 'thin'

gem 'ejs'
gem 'execjs'
gem 'therubyracer'
gem 'haml'

group :development, :test do
  # Testing
  gem 'rspec-rails'
  gem 'factory_girl_rails'
  gem 'shoulda-matchers'

  gem 'coffee-rails' # for jasminerice
  gem 'jasminerice'
  gem 'sass-rails'
end

group :development do
  gem 'guard-rspec', require: false
  gem 'growl', require: false
end

group :assets do
  gem 'handlebars_assets'
end
