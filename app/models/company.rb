class Company < ApplicationRecord
    validates :symbol, presence: true

    def get_current_price
        StockApi.get_current_price(self.symbol)
    end

end