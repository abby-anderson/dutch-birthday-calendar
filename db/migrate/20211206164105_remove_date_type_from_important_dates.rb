class RemoveDateTypeFromImportantDates < ActiveRecord::Migration[6.1]
  def change
    remove_column :important_dates, :date_type, :string
  end
end
