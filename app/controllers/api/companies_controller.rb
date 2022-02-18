class Api::CompaniesController < ApplicationController

    def index
        render json: Company.where('symbol LIKE ?', "%#{params[:symbol]}%").limit(25)
    end
  
    def show

    end
  
end