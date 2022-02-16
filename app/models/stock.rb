class Stock < ApplicationRecord
    validates :symbol, presence: true
    validates :initial_value, presence: true
    validates :quantity, presence: true

    belongs_to :user

    def current_value
        StockApi.get_current_price(self.symbol)
    end

    def net
        self.current_value - self.initial_value.to_i
    end

end