class UserSerializer < ActiveModel::Serializer
  attributes :id, :stock_display
  # has_many :stocks
end
