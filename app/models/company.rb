class Company < ApplicationRecord
    validates :symbol, presence: true

end