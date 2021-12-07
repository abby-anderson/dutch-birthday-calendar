class Api::ImportantDatesController < ApplicationController

    # GET /api/important_dates
    def index
        important_dates = ImportantDate.all
        render json: important_dates, status: :ok
    end

    # POST /api/important_dates
    def create
        important_date = ImportantDate.create(important_date_params)
        if important_date.valid?
            render json: important_date, status: :created
        else
            render json: {error: "Important date could not be recorded. Please review your submission and try again."}, status: :unprocessable_entity
        end
    end

    # GET /api/important_dates/:id
    def show
        important_date = ImportantDate.find_by(id: params[:id])
        render json: important_date, status: :ok
    end

    # PATCH /api/important_dates/:id
    def update
        important_date = ImportantDate.find_by(id: params[:id])
        important_date.update(important_date_params)
        render json: important_date, status: :ok
    end

    # DELETE /api/important_dates/:id
    def destroy
        important_date = ImportantDate.find_by(id: params[:id])
        important_date.destroy
        head :no_content
    end

    private

    def important_date_params
        params.permit(:contact_id, :date_type, :notes, :image_url, :date, :date_title)
    end

end
