class RemoveBirthYearFromContacts < ActiveRecord::Migration[6.1]
  def change
    remove_column :contacts, :birth_year, :integer
  end
end
