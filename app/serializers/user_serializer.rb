class UserSerializer < ActiveModel::Serializer
  attributes :id, :stock_display, :display_balance

  def display_balance
    object.balance.to_f
  end

end
