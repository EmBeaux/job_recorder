require 'json/ext'
require 'pry'

class Api::V1::JobsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    jobs = Job.all
    
    render json: jobs
  end

  def show
  end

  def create
    job = Job.new(job_params)
    if job.save
      render json: job
    else
      render json: job.errors.full_messages
    end
  end

  def destroy
  end

  private

  def job_params
    params.require(:job).permit(:interest, :url, :company)
  end
end