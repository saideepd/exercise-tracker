# Fit Tracker

## Fit Tracker - An Exercise Tracker App

<br/>

Fit Tracker is an Exercise Tracker App that can be used to log the exercises for a user, create different users, and view the exercise logs for any given user whose exercises have been logged into the system.

The app is built with different technologies like ExpressJS (APIs), React (UI) and MongoDB as a part of freeCodeCamp Back End Developement APIs course.

<br/>

## Fit Tracker App:
- Fit Tracker App hosted with Netlify: [https://fittracker.netlify.app/](https://fittracker.netlify.app/ "Fit Tracker App hosted with Netlify") 
- Fit Tracker App hosted with Replit: [https://fittracker.saideepd.repl.co/](https://fittracker.saideepd.repl.co/ "Fit Tracker App hosted with Replit")

## Fit Tracker API:
- Fit Tracker API hosted with Netlify: [https://fittracker-api.netlify.app/api/](https://fittracker-api.netlify.app/api/ "Fit Tracker API hosted with Netlify")
- Fit Tracker API hosted with Replit: [https://fittracker.saideepd.repl.co/api/](https://fittracker.saideepd.repl.co/api/ "Fit Tracker API hosted with Replit")

<br/>

### Front End:
The front end of the app has been built using React JS.
It uses the Material UI library for various different UI components that are used for interaction with the app.
The app has been made responsive to work with devices like Desktop/Laptop, Tablet & Mobile which are having different screen sizes, and the app works perfectly fine and adjusts itself to display the contents correctly as per the screen size.


### Back End:
The Back end of the app is constructed with NodeJS where the server related logic of the app resides.
While the Database used for the application is Mongo DB which is accessed using Mongoose JS library.


### API:
The main aim of this project was to learn building APIs. The APIs for this app are built with ExpressJS which are created as different routes that redirect the request to different sections of the code, all of which serve different purposes.


### Integration:
The Fit Tracker APIs are hosted with Netlify Serverless Functions which are storing & querying the data from MonogoDB database. And, uses MoongoseJS library to interact with the database.
The Fit Tracker UI is developed with ReactJS and hosted on Netlify which uses the Fit Tracker API that we hosted with Netlify.
The UI calls the different API routes as per action performed by user.

<br/>

## freeCodeCamp Course for Back End Development and APIs
You too can learn about back end servers, how to develop APIs and interaction with database using APIs with freeCodeCamp course: [https://www.freecodecamp.org/learn/back-end-development-and-apis/](https://www.freecodecamp.org/learn/back-end-development-and-apis/ "freeCodeCamp Course for Back End Development and APIs")

The course is absolutely free, contains high quality & self-paced lessons which teach a lot.

<br/>

## APIs
### API URL : &nbsp; https://fittracker-api.netlify.app
<br/>

Different APIs that have been developed for this project are:

- ### User API
    The User APIs are used to create and get user for whom the exercises can be logged and tracked  

    - `Create User` [**/api/users**](https://fittracker-api.netlify.app/api/users "Create User")
    
        Method: **POST**
    
        ```
        { 
            "username": "saideep"
        }
        ```
    <br/>
    
    - `Find All Users` [**/api/users**](https://fittracker-api.netlify.app/api/users "Find All Users")

        Method: **GET**
    
    <br/>

    - `Find User By Id` [**/api/users/{:_id}**](https://fittracker-api.netlify.app/api/users/:_id "Find User by Id")

        Method: **GET**

        { } : Not required
    
    <br/>

    -  `Find User by Username` [**/api/users/username/{username}**](https://fittracker-api.netlify.app/api/username/{username} "Find User by Username")

        Method: **GET**

        { } : Not required
    
    <br/>

- ### Exercises API
    The Exercises API is used for creating a log of the exercise performed by a user

    -  `Create or Log Exercise` [**/api/users/{userId}/exercises**](https://fittracker-api.netlify.app/api/users/{userId}/exercises "Create or Log Exercise")

        Method: **POST**

        ```
        {
            ":_id": "61fadfe804ffb1f082692b4b"
            "description": "Morning Run"
            "duration": "30"
            "date": "2022-02-17"
        }
        ```

        The API takes following input properties as payload:
        - **User ID** (This is the same User ID that is created or can be searched with User APIs)
        - **Description** (This is a text input where you can describe or name the exercise performed)
        - **Duration** (A numeric field to log the number of minutes an exercise is performed)
        - **Date** (Date Input field which accepts the date of exercise in `YYYY-MM-DD` format)

    <br/>

- ### Logs API
    The Logs API is used to retrieve the exercise logs for a user from the app

    - `Get Exercise Logs` [**/api/users/{userId}/logs?from={fromDate}&to={toDate}&limit={limit}**](https://fittracker-api.netlify.app/api/users/61fadfe804ffb1f082692b4c/logs?from=2022-01-01&to=2022-02-12&limit=5 "Get Exercise Logs")

        Method: **GET**

        { } : Not required

        The API takes following input values as query parameters:
        - **User ID** (This is the same ID that is created or can be found with User APIs)
        - **From Date** (The date field since when the logs should be fetched)
        - **To Date** (The date field up-to when the logs should be fetched)
        - **Limit** (Number of logs to fetch for given user)

<br/>

# Steps to setup the project locally

Firstly clone the git repo to your system locally with either GitHub Desktop App or Git CLI

```
git clone https://github.com/saideepd/exercise-tracker.git
```

Then cd into your project directory:

```
cd exercise-tracker
```
<br/>

## Install & Setup API Server

Now, in order to start the API server, cd into the root directory of the cloned git repo.
Then install all the required npm packages using the command:
```
npm install
```

This should install the project dependent packages.

We also need to install `netlify-cli` package globally (on our machine & not in the project), which will help us to run serverless functions locally on our machine.\
Install it using the command:
```
npm install netlify-cli -g
```

Once all the installation & setup process is completed, we can start our API Server using the command:
```
netlify dev
```

This command will look for our serverless functions, build them & host them on local server, ready for consumption & testing locally.\
The server will reload when you make changes.

Netlify will start & host the API server on [http://localhost:8888](http://localhost:8888) in most of the cases, unless your port 8888 is occupied by some other process, in which case it'll host the server on different port.

<br/>

## Install & Setup Client side Server

Now that our API server is setup & running after following above steps, the next thing we need to setup is the client side server.

Now, open another terminal and cd into the root directory of the clone repo of our project.
After reaching to root directory, we need to cd into `client` directory using the commands:
```
cd exercise-tracker/client
```

The next step is again similar to one of the previous steps, which is to install the dependent node packages.
Install all the required npm packages using the command:
```
npm install
```

Once, the installation of all the packages is completed, we will start our client side server.
To start the client side server, run the following command:
```
npm start
```

It runs the app in the development mode on [http://localhost:3000](http://localhost:3000), in most of the cases, unless your port 3000 is occupied by some other process, in which case it'll prompt to ask about running it on different port.

Then open the URL [http://localhost:3000](http://localhost:3000) to view it in your browser.

The client side of our app should be running now.

The page will reload when you make changes.\
You may also see any lint errors in the console which you can fix.

<br/>

### Hope you'll have some happy time using, understanding & learning from this project 😊

<br/>

## Screenshots:
![Fit Tracker App](https://user-images.githubusercontent.com/30663492/154738744-b835473e-00d6-4ead-ba20-f8d6ae7cdfe8.png "Fit Tracker App")

![Fit Tracker App Responsive](https://user-images.githubusercontent.com/30663492/154739847-a1ae33c4-c23b-4c15-a92d-d3562b073d7d.png "Fit Tracker App Responsive")
