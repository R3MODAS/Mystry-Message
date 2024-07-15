## Signup Flow

- If the user with the email doesn't exists then create a new user with the details and save the user on db
- If the user with the email exists then check if the user is verified or not
- If the user with the email is verified then return
- If the user with the email is not verified then update the user details (password) and send the verification code to the user
