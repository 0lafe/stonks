# Intro

This app is a simple project which lets users pretend to trade stocks. They can buy and sell stocks, as well as manage their portfolio. All stocks are tracked in real time, and mimic the US Stock exchange.

# Features

Users can sign up for an account giving them $1000 of fake money to start trading. They can then place buy orders for stocks at given prices. When that price is reached the order will be fufilled and the user will own the stock. Users can then resell the stock, hopefully making a profit.

# Deployment

Currently the application is deployed to https://invest-ed.herokuapp.com/

# Setup

add your finnhub.io key to a .env file in the root directory with the format of the example version. 

Run `bundle install` and `yarn install` to get all packages

Run `rails db:create` then `rails db:migrate` to prepare the database. Then run `rake stocks:seed` to seed the DB with company data

Finally running `rails s` and `yarn run dev:client` should run the server locally