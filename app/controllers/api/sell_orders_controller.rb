class Api::SellOrdersController < ApplicationController

    def show
        order = SellOrder.new(
            user: current_user, 
            company: Company.find_by(symbol: params[:id]), 
            asking_price: params[:price],
            quantity: params[:quantity]
        )
        if order.save
            render json: {status: "Success"}
        else
            render json: {status: "Failed", errors: order.errors.full_messages.to_sentence}
        end
    end

end