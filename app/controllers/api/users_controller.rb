class Api::UsersController < SecuredController

    def index
        render json: { Authorized: "Success" }
    end

    def show
        render json: current_user.buy_orders
    end

    def new
        new_user = User.new(email: params[:email], password: params[:password])
        if new_user.save
            sign_in new_user
            render json: {success: "Success"}
        else
            render json: {errors: new_user.errors.full_messages}
        end
    end

end