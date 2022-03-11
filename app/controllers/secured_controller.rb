class SecuredController < ApplicationController
    before_action :authorize_request

    private

    def authorization_service
		@authorization_service ||= AuthorizationService.new(request.headers)
    end
  
    def authorize_request
      authorization_service.authenticate_request!
    rescue JWT::VerificationError, JWT::DecodeError, AuthorizationService::Unauthenticated
      render json: { errors: ['Not Authenticated'] }, status: :unauthorized
    end

	# def current_user
	# 	@current_user ||= begin
	# 		data = authorization_service.get_user_data
	# 		user = User.find_by(auth_0_id: data["sub"])
	# 		if user
	# 			user
	# 		else
	# 			User.create(
	# 				auth_0_id: data["sub"]
	# 			)
	# 		end
	# 	end
	# end

  end