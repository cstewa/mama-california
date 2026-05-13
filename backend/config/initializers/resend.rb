if defined?(::Resend)
  key = ENV["RESEND_API_KEY"]&.strip
  if key.present?
    ::Resend.api_key = key
    Rails.logger.info("[Resend] API key configured (length=#{key.length})")
  else
    Rails.logger.warn("[Resend] RESEND_API_KEY env var is not set — emails will fail")
  end
end
