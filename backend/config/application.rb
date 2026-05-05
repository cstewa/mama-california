require_relative "boot"
require "rails/all"

Bundler.require(*Rails.groups)

module MamaCaliforniaApi
  class Application < Rails::Application
    config.load_defaults 7.1

    # API only mode
    config.api_only = true

    # CORS
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins ENV.fetch("FRONTEND_URL", "http://localhost:5173")
        resource "*",
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head],
          credentials: true
      end
    end

    # Active Storage
    config.active_storage.variant_processor = :mini_magick

    # Time zone
    config.time_zone = "Pacific Time (US & Canada)"
  end
end
