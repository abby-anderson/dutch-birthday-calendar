class Api::ContactsController < ApplicationController

    before_action :authorize

    # GET /api/contacts
    def index
        contacts = Contact.all
        render json: contacts
    end

    # POST /api/contacts
    def create
        new_contact = Contact.new(contact_params)
        if new_contact.save
            render json: new_contact, status: :created
        else
            render json: {error: "Was not able to create new contact, please review your submission and try again."}, status: :unprocessable_entity
        end
    end

    # going to fill these out later
    # GET /api/contacts/:id -- show method
    # PATCH /api/contacts/:id -- update method
    # DELETE /api/contacts/:id -- destroy method

    private 

    def authorize
        if !session.include?(:user_id)
            render json: {error: "Not authorized."}, status: :unauthorized
        end
    end

    def contact_params
        params.permit(:first_name, :last_name, :birth_year, :birth_month, :birth_day, :user_id, :image_url, :notes, :full_birthdate)
    end
end
