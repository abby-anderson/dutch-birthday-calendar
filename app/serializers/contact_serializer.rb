class ContactSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :user_id, :image_url, :notes

  has_many :important_dates
end
