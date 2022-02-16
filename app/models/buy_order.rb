class BuyOrder < ApplicationRecord

    validates :user, presence: true
    validates :symbol, presence: true
    validates :asking_price, presence: true
    validates :quantity, presence: true

    belongs_to :user

    def check
        price = StockApi.get_current_price(self.symbol)
        if price
            if price <= self.asking_price.to_i
                Stock.create(user: self.user, quantity: self.quantity, initial_value: price)
                self.delete
            end
        end
    end

end