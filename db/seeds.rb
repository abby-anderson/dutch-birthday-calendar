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
date_types = ["anniversary", "graduation", "wedding"]

# create 5 random users
5.times do

    first_name_instance = Faker::Name.first_name
    last_name_instance = Faker::Name.unique.last_name 

    user = User.create(
        username: Faker::Games::Pokemon.name,
        first_name: first_name_instance,
        last_name: last_name_instance,
        password: 'password',
        email: Faker::Internet.free_email(name: "#{first_name_instance} #{last_name_instance}"),
        phone_number: Faker::PhoneNumber.cell_phone,
        image_url: Faker::LoremFlickr.image(size: "#{rand(250..300)}x#{rand(250..300)}"),
    )

    # create 10 contacts for each user
    10.times do
        contact = Contact.create(
            first_name: Faker::Name.first_name,
            last_name: Faker::Name.unique.last_name,
            user_id: user.id,
            image_url: Faker::LoremFlickr.image(size: "#{rand(250..300)}x#{rand(250..300)}"),
            notes: "#{Faker::Name.first_name}'s #{Faker::Relationship.familial}",
        )

        # for each contact, create 2 important dates

        # first, a birthday, using the randomly generated one above
        1.times do
            important_date_birthday = ImportantDate.create(
                contact_id: contact.id,
                date: Faker::Date.birthday(min_age: 20, max_age: 100),
                date_type: "birthday", 
                date_title: "#{contact.first_name}'s birthday",
                notes: "Idea - sign up for a #{Faker::Hobby.activity} class for their birthday this year!",
                image_url: Faker::LoremFlickr.image(size: "#{rand(250..300)}x#{rand(250..300)}", search_terms: ['invitation']),
            )
        end

        # then another random special date
        1.times do
            date_type_instance = date_types.sample(1)

            important_date_other = ImportantDate.create(
                contact_id: contact.id,
                date: Faker::Date.between(from: '2010-01-01', to: '2021-01-01'),
                date_type: date_type_instance[0],
                date_title: "#{contact.first_name}'s #{date_type_instance[0]}",
                notes: "Maybe celebratory dinner at #{Faker::Restaurant.name} this year?",
                image_url: Faker::LoremFlickr.image(size: "#{rand(250..300)}x#{rand(250..300)}", search_terms: ['invitation']),
            )
            
        end

    end
    

end





