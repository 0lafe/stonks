namespace :demo do |args|

    task :setup => [ :environment ] do
        User.delete_all
        Stock.delete_all

        # User.create(email: "admin@mail.com", password: "password")

        i = 0
        10.times do
            User.create(email: "#{i}@mail.com", password: "password")
            i += 1
        end
    end

    task :net => [ :environment ] do
        puts User.first.get_net
    end

    task :run => [ :environment ] do
        total = BuyOrder.count
        puts "#{total} buy orders to go through"
        BuyOrder.all.each do |order| 
            order.check 
        end
        puts "#{total - BuyOrder.count} fufiled!"

        total = SellOrder.count
        puts "#{total} sell orders to go through"
        SellOrder.all.each do |order| 
            order.check 
        end
        puts "#{total - SellOrder.count} fufiled!"
    end

    task :gen_orders => [ :environment ] do
        symbols = StockApi.get_symbols
        puts "symbols obtained"
        User.all.each_with_index do |user, index|
            rand(10).times do
                symbol = symbols.sample
                price = StockApi.get_current_price(symbol)
                BuyOrder.create(user: user, quantity: rand(10), symbol: symbol, asking_price: price + rand(13) - 6)
            end
            puts "user #{index + 1} of 10 done!"
        end
    end

    task :test => [ :environment ] do
        user = User.find_by(email: 'admin@mail.com')
        company = Company.find_by(symbol: 'AAPL')
        company2 = Company.find_by(symbol: 'GOOGL')
        Stock.create(user: user, company: company, quantity: 10, initial_value: "10.00")
        Stock.create(user: user, company: company2, quantity: 10, initial_value: "10000.00")
    end

    task :clear_data => [ :environment ] do
        Stock.delete_all
        BuyOrder.delete_all
        SellOrder.delete_all
        User.delete_all

        User.create(email: 'admin@mail.com', password: 'password')
    end

end