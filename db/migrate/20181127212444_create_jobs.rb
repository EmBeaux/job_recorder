class CreateJobs < ActiveRecord::Migration[5.2]
  def change
    create_table :jobs do |t|
      t.string :company, null: false
      t.string :url, null: false
      t.integer :interest, null: false
      t.boolean :applied, null: false

      t.timestamps
    end
  end
end
