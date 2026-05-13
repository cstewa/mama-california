class AddPasswordResetToMembers < ActiveRecord::Migration[7.2]
  def change
    add_column :members, :reset_password_token, :string
    add_column :members, :reset_password_token_expires_at, :datetime
    add_index  :members, :reset_password_token, unique: true
  end
end
