class AddDateTypeToImportantDates < ActiveRecord::Migration[6.1]
  def change
    add_column :important_dates, :date_type, :string
  end
end
