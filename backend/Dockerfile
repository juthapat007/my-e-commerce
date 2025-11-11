FROM ruby:3.3

# Set working directory
WORKDIR /rails

# Install dependencies for building gems
RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev nodejs

# Copy Gemfile first to leverage Docker cache
COPY Gemfile Gemfile.lock ./

# Install bundler and gems
RUN gem install bundler && bundle install


# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 3000

# Default command
CMD ["bin/rails", "server", "-b", "0.0.0.0"]
