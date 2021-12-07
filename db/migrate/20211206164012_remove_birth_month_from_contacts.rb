class RemoveBirthMonthFromContacts < ActiveRecord::Migration[6.1]
  def change
    remove_column :contacts, :birth_month, :integer
  end
end
