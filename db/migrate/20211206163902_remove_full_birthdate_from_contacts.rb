class RemoveFullBirthdateFromContacts < ActiveRecord::Migration[6.1]
  def change
    remove_column :contacts, :full_birthdate, :date
  end
end
