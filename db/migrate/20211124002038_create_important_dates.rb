class CreateImportantDates < ActiveRecord::Migration[6.1]
  def change
    create_table :important_dates do |t|
      t.integer :contact_id
      t.string :date_type
      t.text :notes
      t.string :image_url

      t.timestamps
    end
  end
end
