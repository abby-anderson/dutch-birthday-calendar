class Api::SessionsController < ApplicationController

    # POST /api/login
        # with login, we're finding user by username bc it's unique. only other real option with login would be find by password, which wouldn't make sense bc they're not necessarily unique
    def create
        user = User.find_by(username: params[:username])
        # if user && user.authenticate(by user params) are true
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {error: "Invalid username or password"}, status: :unauthorized
        end
    end

    # DELETE /api/logout
    def destroy
        if session[:user_id]
            session.delete(:user_id)
            head :no_content
        else
            render json: {error: "No user is currently logged in."}, status: :unauthorized
        end
    end

end
