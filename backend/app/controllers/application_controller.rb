class ApplicationController < ActionController::API
  SECRET = ENV.fetch("SECRET_KEY_BASE", "dev_secret_change_in_production")

  def authenticate_admin!
    member = current_member
    render json: { error: "Unauthorized" }, status: :unauthorized unless member&.is_admin?
  end

  def authenticate_member!
    render json: { error: "Unauthorized" }, status: :unauthorized unless current_member
  end

  def current_member
    @current_member ||= begin
      token = request.headers["Authorization"]&.split(" ")&.last
      return nil unless token
      payload = JWT.decode(token, SECRET, true, algorithm: "HS256").first
      Member.find_by(id: payload["member_id"])
    rescue JWT::DecodeError
      nil
    end
  end

  def jwt_token(member)
    payload = { member_id: member.id, exp: 30.days.from_now.to_i }
    JWT.encode(payload, SECRET, "HS256")
  end
end
