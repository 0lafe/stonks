class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :stocks
  has_many :buy_orders

  def stock_display
    stocks = {}
    self.stocks.each do |stock|
      symbol = stock.company.symbol
      quantity = stock.quantity
      if stocks[symbol]
        stocks[symbol] = { 
          quantity: stocks[symbol][:quantity] + quantity,
          cost: stocks[symbol][:cost] + stock.initial_value.to_f * quantity,
          name: stocks[symbol][:name],
          symbol: symbol
        }
      else
        stocks[symbol] = { 
          quantity: quantity, 
          cost: stock.initial_value.to_f * quantity,
          name: stock.company.name,
          symbol: symbol
        }
      end
    end
    output = []
    stocks.keys.each do |key|
      stocks[key][:cost] = stocks[key][:cost] / stocks[key][:quantity]
      output << stocks[key]
    end
    output
  end

  def get_net
    net = 0
    self.stocks.all.each { |stock| net += stock.net }
    net
  end

  def reduce_balance(price)
    self.update(balance: (self.balance.to_f - price).to_s)
  end

  def increase_balance(price)
    self.update(balance: (self.balance.to_f + price).to_s)
  end

end
