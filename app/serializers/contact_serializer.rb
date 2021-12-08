class ContactSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :user_id, :image_url, :notes

  belongs_to :user
  has_many :important_dates
end
