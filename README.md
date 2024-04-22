# Fluffbook

## A project for the codecademy full stack development program

## Introduction

The aim of this project was to showcase developing a website using using React, Node/Express, and PostgreSQ. Initially I was just going to do a small app with just todos and notes but added the calendare when doing research with my friends. this was thwe first project i started with test first design for the front end.

## Features
* User login that stores settings for later. 
* Todo list chn be crates.
* Notes can be created ansd shared with other users
* A Calendar with events, reminders and appointments
* Being able to customise the colours the app appears in including a hi contrast mode, eacj picture has a tasteful background image to accompany it.

## Backend

The backend files are located in /backend folder. 

### Database

The back end uses a postgreSQL database, i've left a copy of the Sql use to genereate the bare bones of the database in place. Since i'm not using session data a session table was not neccesary. 
The tables are loosley broken down as so:

* Users: where the bulk of the user information lives, User_PFP holds the profile picture
* Friends: hold the relationships of users to other users, each pair of friends has a line each in the database with a trigger ensuring the pair is maintained.  The friend types allow blocking and unfollowing and mark if a friend has accepted you.
* Items: the notes todos and calendar items, todos have a subtable showing the todos to be marked off, calendar items have a table containing the calendar information place etc, they come in 3 types,m reminders that are personal to the user, appointments that users can invite friends to and events which are open items that people can invit4e themselves to. Notes come as 2 types notes, whivh are user generated, and notifications which are system gnerated.

### Middleware

The middleware is using swagger to document the routes. I used the @OAS-tools library to complete the database as it was then easier to implement the extra middleware I needed. I am using passport.js and jwt bearer tokens to handle user authentication. As mentioned above there is no session side data the entire system works on JWT tokens. I'm quite happy that i worked out how to apply security properly via  @OAS-tools rather than the workaround i applied in previous projects. schema2.yaml contains the yaml description of the routes. 
Notable Libries used:

* Multer to handle the storage of Images onto the database.
* Bycrypt to create the salted-hashed passwords
* @OAS-Tools and express to handle the routing
* PG to handle the database connections. 

## Frontend

The frontend of this project leverages React for its user interface, with React Routes serving as a valuable tool for enhancing code organization and simplifying navigation. While the primary focus of React Routes is on facilitating development workflows, their usage contributes to a streamlined development process, improving code maintainability and overall project efficiency.
I am using Redux to store the state data for react and to manage the front end interactions with the middleware. I find this is a solid solution for Route based front end design as one does not have to manage the transfer of states bdetween each component but rather handle them individually.

### Styling

I am using CSS for the styling. The colour colour schemes are set using css variables that are then set in code later. I picked the rough colour schemes than to soften them i picked the background images. Then I tweaked the coulours based on an average of colours in the background images (except oddy the pink option looked better with most of its original colours so they got kept.). 

### Images

All the background images come from <www.unsplash.com> and are royaly free images.

* Sandy - by Gustavo (@natura_photos)- <https://unsplash.com/photos/brown-brick-pavement-CEeoDFpVxxw>
* Forest - by Marc Pell (@blinky264) - <https://unsplash.com/photos/green-leafed-trees-during-daytime-oWRVjFQIwAY>
* Ocean - by Jeremy Bishop (jeremy-bishop) - <https://unsplash.com/photos/grey-school-of-fish-under-water-TI_3eaoMyjo>
* Pinky - by Meiying Ng (@meiying) - <https://unsplash.com/photos/skyscraper-covered-with-fog-at-daytime-OrwkD-iWgqg>
* Dark - by Joshua Woroniecki (@joshua_j_woroniecki) - <https://unsplash.com/photos/green-trees-under-starry-night-3mXIZP6_6zY>

The Pengiun image is one i took myself at West midlands Safari Park in 2018, I took the outline and coloured it in pink and the eyes blue I made the background sligthly transparent so it would blend with the background better, then the other 2 images were created by using GIMP to rehue the pink fill.

## Challenges and Learnings

My largest challenge was the scope of this project. There were a lot more moving parts to this that i tought. Testing be design was an interesting experioence and added a couple of weeks to the process however i do belive that it was worth the effort especially when it came to rendering the components. 

## Future work

* Todos do not update this function was cut due to time constraints
* the database needs more security both in avoiding issues such as code injection but also the items should be incrypted.
* The YAML docs need to be fully filled out there are still some small items misign such as the queires for the item popups.
* the wall needs a filter
* The users notes need their own page initially this was going to be in the shared space with the wall but was cut for time
* Oauth logins for some popular sites
* More notifications need to go to the wall originally any update was going to be recordered there. 