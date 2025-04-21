# A simple Blogging Platform using NodeJS, Angular, Springboot. 


To run the website, you must run both the back and front end seperately

There a few changes that you have to make which are:

changing the database name, user, and password. in two files; 

1.) .env file                      | ".\BlogServer\backend\.env"

2.) application.properties file.   | ".\BlogServer\backend\src\main\resources\application.properties"


## **Caution** 

**This is an assumption that you have maven, springboot, and MYSQL configured properly**

## **Steps to Run the Website**

### Step1 

Execute the commands from the - MySQL_Queries.txt after creating a database of your desired name

Open two seperate terminals

### Step3 

Navigate to the backend and frontend dir in one terminal each

### Step4

Start the backend with `mvn spring-boot:run` 

### Step5

Install all the dependencies for the front end with `npm install`

### Step6 

start the front end with `npm start`



