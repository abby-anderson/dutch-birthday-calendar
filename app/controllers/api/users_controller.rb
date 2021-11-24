class Api::UsersController < ApplicationController
    
    # POST /api/signup
    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] ||= user.id
            render json: user, status: :created
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    # GET /api/me
    def show
        current_user = User.find_by(id: session[:user_id])
        if current_user
            render json: current_user, status: :ok
        else    
            render json: "Please log in", status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:username, :first_name, :last_name, :password, :password_confirmation, :email, :phone_number, :image_url)
    end
end
