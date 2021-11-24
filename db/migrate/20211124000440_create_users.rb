class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :first_name
      t.string :last_name
      t.string :password_digest
      t.string :email
      t.string :phone_number
      t.string :image_url

      t.timestamps
    end
  end
end
