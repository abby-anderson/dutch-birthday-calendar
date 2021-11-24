require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts '🌱 Seeding data...'

User.destroy_all
Contact.destroy_all
ImportantDate.destroy_all

puts '🌱 Seeding users...'
puts '🌱 Seeding contacts...'
puts '🌱 Seeding important dates...'

# future additions: passing, baby's birth, 
date_types = ['anniversary', 'graduation', 'marriage']

# create 5 random users
5.times do
    user = User.create(
        username: Faker::GreekPhilosophers.unique.name,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.unique.last_name,
        password: 'password',
        email: Faker::Internet.free_email,
        phone_number: Faker::PhoneNumber.cell_phone,
        image_url: Faker::LoremFlickr.image(size: "#{rand(250..300)}x#{rand(250..300)}")
    )

    # create 10 contacts for each user
    10.times do
        contact = Contact.create(
            first_name: Faker::Name.first_name,
            last_name: Faker::Name.unique.last_name,
            birth_year: Faker::Number.within(range: 1990..2000),
            birth_month: Faker::Number.within(range: 1..12),
            birth_day: Faker::Number.within(range: 1..28),
            user_id: user.id,
            image_url: Faker::LoremFlickr.image(size: "#{rand(250..300)}x#{rand(250..300)}"),
            notes: Faker::Lorem.paragraph(sentence_count: 2),
            full_birthdate: Faker::Date.between(from: '1990-01-01', to: '2000-01-01')
        )

        # for each contact, create 2 important dates

        # first, a birthday, using the randomly generated one above
        1.times do
            important_date_birthday = ImportantDate.create(
                contact_id: contact.id,
                date_type: "birthday", 
                notes: Faker::Lorem.paragraph(sentence_count: 2),
                image_url: Faker::LoremFlickr.image(size: "#{rand(250..300)}x#{rand(250..300)}", search_terms: ['invitation']),
                date: contact.full_birthdate
            )
        end

        # then another random special date
        1.times do
            important_date_other = ImportantDate.create(
                contact_id: contact.id,
                date_type: date_types.sample(1), 
                notes: Faker::Lorem.paragraph(sentence_count: 2),
                image_url: Faker::LoremFlickr.image(size: "#{rand(250..300)}x#{rand(250..300)}", search_terms: ['invitation']),
                date: Faker::Date.between(from: '2010-01-01', to: '2020-01-01')
            )
            
        end

    end
    

end





