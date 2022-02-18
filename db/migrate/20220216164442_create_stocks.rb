class CreateStocks < ActiveRecord::Migration[6.1]
  def change
    create_table :stocks do |t|
      t.string :initial_value, null: false
      t.integer :quantity, null: false, default: 1

      t.belongs_to :user, null: false
      t.belongs_to :company, null: false
      t.timestamps
    end
  end
end
