class StockApi

    API_KEY = ENV['FINNHUB_API_KEY']
    BASE_URL = 'https://finnhub.io/api/v1/'

    def self.get_history(symbol)
        now = Time.now.to_i
        previous_time = now - 2592000
        url = "#{BASE_URL}stock/candle?symbol=#{symbol}&resolution=D&from=#{previous_time}&to=#{now}&token=#{API_KEY}"
        api_response = Faraday.get(url)
        parsed_response = JSON.parse(api_response.body)
    end

    def self.get_current(symbol)
        url = "#{BASE_URL}quote?symbol=#{symbol}&token=#{API_KEY}"
        api_response = Faraday.get(url)
        parsed_response = JSON.parse(api_response.body)
    end

    def self.get_current_price(symbol)
        get_current(symbol)["c"]
    end

    def self.get_symbols
        url = "#{BASE_URL}stock/symbol?exchange=US&token=#{API_KEY}"
        api_response = Faraday.get(url)
        parsed_response = JSON.parse(api_response.body)
        binding.pry
        symbols = []
        parsed_response.each do |data|
            symbols << data["symbol"]
        end
        symbols
    end

    def self.seed_companies
        url = "#{BASE_URL}stock/symbol?exchange=US&token=#{API_KEY}"
        api_response = Faraday.get(url)
        parsed_response = JSON.parse(api_response.body)
        length = parsed_response.length
        puts "Saving #{length} companies"
        companies = []
        parsed_response.each_with_index do |data, index|
            companies << { symbol: data["symbol"], name: data["description"] }
        end
        Company.import companies
    end

end