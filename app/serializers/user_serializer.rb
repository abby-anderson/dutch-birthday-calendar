class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :email, :phone_number, :image_url

  has_many :contacts
  has_many :important_dates
end
