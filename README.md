## Learning Nextjs with Typescript

- In the src directory, `models` directory should contains the information about the data which we will be storing in the database
- Inside the `User.ts` model file, we will need to define the structure of data and while using typescript, we need to define the Schema type
- In the src directory, `schemas` directory should contains all the validations for data sent by client (user) before sending it on server and store it in DB
- Normally once `backend` starts, it runs continuously and that's how it should work but `Nextjs` is different as it is an `Edge time framework` as this application does not runs continuously, when the user requests something then only the execution of that thing happens
- Whenever creating `Database connection`, check whether the connection was already made to the database or not, if yes then work on the connected one if not then connect to the database (rather than connecting to database again and again which is bad)
