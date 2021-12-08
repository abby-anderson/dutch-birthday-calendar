class ImportantDateSerializer < ActiveModel::Serializer
  attributes :id, :contact_id, :notes, :image_url, :date, :date_title, :date_type

  belongs_to :contact
  
end
