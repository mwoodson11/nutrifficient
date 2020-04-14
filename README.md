# Nutrifficient

## Project Description

The nutrifficient application is designed to provide an application that helps people keep track of their nutrition history and provide useful features to fulfill daily goals. The main features of the app include:
* Logging daily food consumption and show nutrition
* Storing food pantry items
* Reporting daily nutritional intake
* Offering suggestions for what food to eat in your pantry to fulfill nutrition goals
* Reporting nutritional deficiencies and list possible symptoms the user may be experiencing

## How To Run

The app can be run through the command line by first running the server, and then running the client.

After cloning the github repository to your computer, open the command line and head to the project directory and change into the server directory. Install the dependencies and start the server by running:

### `npm install`
### `nodemon server`

Now, open the command line and head to the project directory. Install the dependencies and start the app by running:

### `npm install`
### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To access the application, you will have to create an account, but for demo usage. The username **demo1234** and password **demo12** can be used.

## Main Files

The main features for the front-end application are all located in the directory src/components/Homepage. The following are the components that our project heavily focused on:
* FoodAvailable.js
* foods-list.component.js
* NutrientTracker.js
* Suggestions.js
* Utils.js

The main features for the back-end were the routes, located in the director server/routes. The following files contain the majority of the routes used to get and post to mongoDB database: 
* foods.js
* users.js 

The remaining file in this directory, **servings.js**, was used to convert foods retrieved from the USDA API to proper serving sizes so we would show useful information. It is useful, but contains few routes.

