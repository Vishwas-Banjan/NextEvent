# NextEvent

(Refer Requirements and Design Document.pdf/User Manual.pdf for more info)

Requirement and design document

Project overview

NextEvent is an event organizing website. Here general users can check out events happening around them. Registered users can host Food and Drinks or Music events, as well as RSVP to events.

Requirements

Entire application is built using a JavaScript runtime build on Chrome's V8 JavaScript engine.
 – Node.js. v10.16.3
It is a free, open source server environment which runs on various platforms (Windows, Linux, Unix, Mac OS X, etc.)
NPM (Node package manager) as package manager is used to make use of shared packages, or modules.
The IDE (Integrated Development Environment) used is JetBrains WebStorm. It is a powerful IDE for modern JavaScript development especially Node.js. I prefer this IDE for its smart code completion, powerful navigation features, on-the-fly error detection, and refactoring’s.
I’m using NoSQL Database system to store Application data, because of simplicity of design and simpler scaling. MongoDB v4.2 is used to support the application, it is a Document Store Type NoSQL Database.

Application Architecture

I’ve used MVC (Model View Controller) Architecture. This type of architecture works well with Object oriented programming, since different models, views, and controllers can be treated as objects and reused within the application.
Model: Model represents shape of the data and business logic. It maintains the data of the application. Model objects retrieve and store model state in our database.
View: View is a user interface. View displays data using model to the user and enables them to modify the data.
Controller: Controller handles the user request. Typically, user interacts with View, which in-turn raises appropriate URL request, this request will be handled by a controller. The controller renders the appropriate view with the model data as a response.

Application has 4 structural repositories:
Routes handles the URL requested and serves it to appropriate controller. 
Model represents the schema of different collections in the database.
View represents EJS files being served to user for interaction and viewing.
Controller handles the URL directed by routes to render appropriate response.

Database Structure

NoSQL Database is divided into Collections, and each entry is called Document.
Application Database is divided into 3 main collections :
Connections: This store event data.
Users: This store user data.
User Profile: This stores events saved by each registered user, and their status of RSVP.

Another utility collection used is:
Helper Data: This store data to show on Home, About Us and Contact Support pages.

Target Market

•	Everyone who wants to find events happening around them and wants to keep a track of events they have RSVP’d for their reference. 
•	Teams and Individuals who want to host different events and want to let people know.


 
Page Design

Home Page
This page acts as a welcome page to the application and provides a brief of what the app is all about.
Audience : General Users
 

Every page includes a Top Navigation Bar and Bottom navigation bar. User can navigate to Login, Sign Up, Connections and Create Event pages.
From the bottom navigation bar, User can navigate to Contact Support and About Us pages.
These functionalities of the Top Navigation bar are same across all pages when user is not logged in.

Connections Page
This page lists all the connections or events of different categories created by users
Audience : General Users
 
Connection Detail
This page provides details about the selected event, Event Name and Photo, Hosted By, Time, Data, Location, and provides description about the event.
Also provide options to RSVP to event with Yes/No/Maybe, clicking on it adds the event to logged in user’s saved connections. This functionality is only available to registered users to add the connection to their Saved Connections. For general users, clicking on RSVP buttons will redirect to Login Page.
Audience : General Users and Registered Users
 
 
If the user logged in created particular connection , he will be shown a delete option.
If user’s not the creator, He will not be shown the delete option. Once the connection has been deleted it won’t be visible to other users even if they had given RSVP to it, it will be removed from their savedConnections.

Saved Connections
This page contains information about user’s saved connections, it includes a summary of the connections they've shown interest in and saved in this application. This page provides functionality of Updating the RSVP or deleting the event from the saved records of the user.
Clicking on update will redirect to that connection page, allowing user to go through event details and change their RSVP status.
The Navigation bar changes when a user logs in, it is replaced with Logout button and User Name button.
Clicking on Logout, logs out user and redirects to connections page. 
Clicking on Username, takes user to Saved Connections of the User. 
These functionalities of the Top Navigation bar are same across all pages when logged in.
Audience : Registered Users


Create Event
This page provides logged in user to create an event, user must pick a category from category of event from - Food and Drinks or Music Event, provide event name, description , date, time, duration of event and location of the event. 
If user is not logged in, this page will redirect use to login.
Audience : Registered Users
Data Fields Presented and Validations: 
Event Name is validated for minimum length of 3 and maximum of 50 characters
Event Details is validated for minimum length of 3 and maximum of 200 characters
Event Location is validated for minimum length of 3 and maximum of 100 characters
Event Duration is validated for maximum hours of 12.
Event Date and Time Picker is validated to be in between 2019-10-11 00:00 and 2020-12-31 00:00



Clicking on Create Connection button, will create a new Event and redirect user to display all events page (Connections)

Login
This page allows registered users to login.
Audience : General Users
 

Data Fields Presented and Validations: 
	Email is validated if it’s in email format using express validator
	Password is validated for minimum of 6 characters
	 
Sign Up
This page allows users to register and login.
Audience : General Users
 

Data Fields Presented and Validations: 
	Email is validated if it’s in email format using express validator
	Password is validated for minimum of 6 characters
	First Name and Last Name is validated to be just alphabets


Contact Support
This page answers FAQs about using the application, and to contact customer care in case of any further queries.
Audience : General Users and Registered Users
Clicking on Go to Saved Events, will redirect user to login, if not already logged in. Logged In users will be redirected to their saved connections page, listing the events they RSVP’d to.
Clicking on Go to Event Listing will redirect users to display all events (Connections) page.
 

About Us
This page provides details about the application and what is does
Audience : General Users
 


