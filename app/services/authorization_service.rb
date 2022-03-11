class AuthorizationService
	class Unauthenticated < StandardError; end

	def initialize(headers = {})
		@headers = headers
	end

	def authenticate_request!
		# verify_token
		get_user_data
	end

	def get_user_data
		conn = Faraday.new(
			url: "https://#{ENV["AUTH0_DOMAIN"]}",
			headers: { Authorization: @headers['Authorization'] }
		)
		reply = conn.get("/userinfo")
		if reply.status != 200
			raise Unauthenticated
		else 
			return JSON.parse(reply.body)
		end
	end

	private

	def http_token
		if @headers['Authorization'].present?
			@headers['Authorization'].split(' ').last
		end
	end

	def verify_token
		JsonWebToken.verify(http_token)
	end

end