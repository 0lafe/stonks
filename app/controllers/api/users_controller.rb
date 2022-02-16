class Api::UsersController < ApplicationController

    def index
        if current_user
            render json: current_user
        else
            render json: {}
        end
    end

    def show
        render json: current_user.buy_orders
    end

end