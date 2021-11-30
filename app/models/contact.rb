class Contact < ApplicationRecord

    belongs_to :user
    has_many :important_dates, dependent: :destroy

end
