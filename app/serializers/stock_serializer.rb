class StockSerializer < ActiveModel::Serializer
  attributes :id, :company, :quantity, :initial_value
end
  