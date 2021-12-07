class AddDateTitleToImportantDates < ActiveRecord::Migration[6.1]
  def change
    add_column :important_dates, :date_title, :string
  end
end
