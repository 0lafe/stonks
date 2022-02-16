namespace :stocks do |args|

    desc "stock history"
    task :history => [ :environment ] do
        ARGV.each { |a| task a.to_sym do ; end }
        StockApi.get_history(ARGV[1])
    end

    desc "current stock data"
    task :current => [ :environment ] do
        ARGV.each { |a| task a.to_sym do ; end }
        StockApi.get_current(ARGV[1])
    end

end