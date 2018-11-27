class Job < ApplicationRecord
  validates :company, presence: true
  validates :url, presence: true
  validates :interest, presence: true
end
