# Vaccinations application

This is a web application created as a solution to a job application exercise by Solita:

https://github.com/solita/vaccine-exercise-2021

The application showcases vaccination statistics using a custom dataset that was provided with the exercise.

Unfortunately, time ran a little short and I didn't manage to write proper tests for the application. Also, the installation and running guide could be more detailed and there may be some difficulties with some of the steps.

# Installation guide

Install npm.

Install NodeJS. Version 12.0 or later.
https://nodejs.org/en/download/

Install Next.
npm install next

Install MongoDB version 5.0 (or later).
https://docs.mongodb.com/manual/administration/install-community/

Import all datasets from the resources folder into the database.

mongoimport --db Vaccinations --collection vaccination --file vaccinations.source

mongoimport --db Vaccinations --collection order --file Antiqua.source

mongoimport --db Vaccinations --collection order --file SolarBuddhica.source

mongoimport --db Vaccinations --collection order --file Zerpfy.source

# Running the application

The web application can be started with the following command in the vaccinations_app folder:

npm run dev

An instance of MongoDB needs to be running in order to show the data. 

Run a mongodb instance with the command "mongod"

It runs in the port 27017 by default and the connectionstring is found in the .env.local file.

 
