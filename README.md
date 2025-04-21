# A simple Blogging Platform using NodeJS, Angular, Springboot. 


To run the website, you must run both the back and front end seperately

There a few changes that you have to make which are:

changing the database name, user, and password. in two files; 

1.) .env file                      | ".\BlogServer\backend\.env"

2.) application.properties file.   | ".\BlogServer\backend\src\main\resources\application.properties"


## **Caution** 

**This is an assumption that you have maven and springboot configured properly**

## **Steps to Run the Website**

### Step1 

Open two seperate terminals

### Step2 

Navigate to the backend and frontend dir in one terminal each

### Step3 

Start the backend with `mvn spring-boot:run` 

### Step4

Install all the dependencies for the front end with `npm install`

### Step5 

start the front end with `npm start`



