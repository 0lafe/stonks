class CreateCompanies < ActiveRecord::Migration[6.1]
  def change
    create_table :companies do |t|
      t.string :symbol, null: false
      t.string :name, null: false, default: ""
    end
  end
end
