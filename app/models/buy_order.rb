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
            if price <= self.asking_price.to_i
                puts "Giving #{self.user.email} #{self.quantity} for #{price}"
                Stock.create(user: self.user, company: self.company, quantity: self.quantity, initial_value: price)
                self.delete
            end
        end
    end

end