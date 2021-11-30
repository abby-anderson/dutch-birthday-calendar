class ContactSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :birth_year, :birth_month, :birth_day, :full_birthdate, :user_id, :image_url, :notes

  has_many :important_dates
end
