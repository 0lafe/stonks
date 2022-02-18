class Api::StocksController < ApplicationController

  def index
    
  end

  def show
    render json: { history: StockApi.get_history(params[:id]), current_price: StockApi.get_current_price(params[:id]) }
  end

end