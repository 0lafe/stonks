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
        puts "#{total} orders to go through"

        BuyOrder.all.each do |order| 
            order.check 
        end

        puts "#{total - BuyOrder.count} fufiled!"
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

end