class SellOrder < ApplicationRecord

    validates :user, presence: true
    validates :company, presence: true
    validates :asking_price, presence: true
    validates :quantity, presence: true

    belongs_to :user
    belongs_to :company

    def check
        price = self.company.get_current_price
        if price
            if price <= self.asking_price.to_f
                puts "Selling #{self.user.email} #{self.quantity} for #{price} each :)"
                stock = Stock.find_by(user: self.user, company: self.company)
                stock.quantity -= self.quantity
                if stock.save
                    self.user.increase_balance(price * self.quantity)
                    if stock.quantity == 0
                        stock.delete
                    end
                    self.delete
                else
                    puts "Uh Oh sell order failed"
                end
            end
        end
    end

end