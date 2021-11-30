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

    # GET /api/contacts/:id
    def show
        contact = Contact.find_by(id: params[:id])
        render json: contact, status: :ok

    end


    # PATCH /api/contacts/:id
    def update
        contact = Contact.find_by(id: params[:id])
        contact.update(contact_params)
        render json: contact, status: :ok

    end

    # DELETE /api/contacts/:id
    def destroy
        contact = Contact.find_by(id: params[:id])
        contact.destroy
        head :no_content

    end

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
