class CreateContacts < ActiveRecord::Migration[6.1]
  def change
    create_table :contacts do |t|
      t.string :first_name
      t.string :last_name
      t.integer :birth_year
      t.integer :birth_month
      t.integer :birth_day
      t.integer :user_id
      t.string :image_url
      t.text :notes
      t.date :full_birthdate

      t.timestamps
    end
  end
end
