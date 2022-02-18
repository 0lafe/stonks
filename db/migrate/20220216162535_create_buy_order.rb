class CreateBuyOrder < ActiveRecord::Migration[6.1]
  def change
    create_table :buy_orders do |t|
      t.belongs_to :user, null: false
      t.belongs_to :company, null: false
      t.string :asking_price, null: false
      t.integer :quantity, null: false, default: 1

      t.timestamps
    end
  end
end
