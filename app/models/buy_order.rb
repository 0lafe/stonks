class BuyOrder < ApplicationRecord

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
                puts "Giving #{self.user.email} #{self.quantity} for #{price} each :)"
                stock = Stock.find_or_create_by(user: self.user, company: self.company)
                if stock.id
                    current_average = stock.initial_value.to_f
                    stock.initial_value = (current_average + (price - current_average) / (self.quantity + stock.quantity)).to_s
                    stock.quantity += self.quantity
                else 
                    stock.initial_value = price
                    stock.quantity = self.quantity
                end
                stock.save
                self.user.reduce_balance(price * self.quantity)
                self.delete
            else
                puts "The buy order for #{self.quantity} #{self.company.name} stock is too low (#{self.asking_price} vs. #{price})"
            end

        end
    end

end