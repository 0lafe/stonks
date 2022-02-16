class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :stocks
  has_many :buy_orders

  def get_net
    net = 0
    self.stocks.all.each { |stock| net += stock.net }
    net
  end

  def hello
    puts "hello"
  end

end
