class Contact < ApplicationRecord

    belongs_to :user
    has_many :important_dates

end
