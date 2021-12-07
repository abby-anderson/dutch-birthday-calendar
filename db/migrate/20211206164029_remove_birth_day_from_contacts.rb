class RemoveBirthDayFromContacts < ActiveRecord::Migration[6.1]
  def change
    remove_column :contacts, :birth_day, :integer
  end
end
