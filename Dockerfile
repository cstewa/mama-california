# Stage 1: Build React frontend
FROM node:22-slim AS frontend-build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Rails backend + serve frontend
FROM ruby:3.3.0-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    postgresql-client \
    imagemagick \
    libmagickwand-dev \
    libvips-dev \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY backend/Gemfile backend/Gemfile.lock ./
RUN bundle install --without development test
COPY backend/ ./
COPY --from=frontend-build /frontend/dist ./public/

ENV RAILS_ENV=production
ENV RAILS_LOG_TO_STDOUT=true
ENV RAILS_SERVE_STATIC_FILES=true

EXPOSE 3000

CMD ["sh", "-c", "bundle exec rails db:migrate && bundle exec puma -C config/puma.rb"]
