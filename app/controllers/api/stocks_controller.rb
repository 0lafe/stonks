class Api::StocksController < ApplicationController

  def index
    render json: StockApi.get_history(params[:stock])
  end

  def show
    render json: StockApi.get_current_price(params[:id])
  end

end