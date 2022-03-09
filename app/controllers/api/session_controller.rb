class Api::SessionController < ApplicationController

    def index
        render json: { id: session[:user_id] }
    end

    def create
        user = User.find_by(email: params[:email])
        if user
            if user.valid_password?(params[:password])
                session[:user_id] = user.id
                render json: user
            else
                render json: {errors: "Incorrect Email or Password"}
            end
        else
            render json: {errors: "Incorrect Email or Password"}
        end
    end

    def new
        user = User.find_by(email: params[:email])
        if user
            if user.valid_password?(params[:password])
                session[:user_id] = user.id
                render json: user
            else
                render json: {errors: "Incorrect Email or Password"}
            end
        else
            render json: {errors: "Incorrect Email or Password"}
        end
    end

end