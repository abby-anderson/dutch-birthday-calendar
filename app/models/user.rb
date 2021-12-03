class User < ApplicationRecord

    validates :username, uniqueness: true
    validates :password, length: {minimum: 8}

    has_secure_password

    has_many :contacts
    has_many :important_dates, through: :contacts
end
