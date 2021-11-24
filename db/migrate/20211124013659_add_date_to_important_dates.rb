class AddDateToImportantDates < ActiveRecord::Migration[6.1]
  def change
    add_column :important_dates, :date, :date
  end
end
