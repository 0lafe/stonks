class Stock < ApplicationRecord
    validates :initial_value, presence: true
    validates :quantity, presence: true

    belongs_to :user
    belongs_to :company

    def net
        self.company.get_current_price - self.initial_value.to_i
    end

end