# GetBusy

This project is solution for Navigus Assignment 2, given to selective students during its placement drive.

## Usage

0. Your system must have node environment already setup. If not, then install nodejs environment first [install](https://nodejs.org/en/download/).

1. After node setup on your system clone or downlaod this repository locally in your system.

1. Add .env file in the root directory and add the following:
```sh
  mongoUri = '<YOUR_MONGODB_URL>'
  secret = 'helloworld'
  PORT = 4000
```
2. Install dependencies
```sh
   npm install
```
3. Open your browser and move to ```http://localhost:4000``` (You are good to go!)

## API 

1. Register user (POST)
```sh
> https://getbusyapi.herokuapp.com/getbusy.com/users/register 
  Request body
 { 
  "name":"test",
  "email":"test@test.com",
  "password":"password"
  }
```
2. Login User (POST)
```sh
> https://getbusyapi.herokuapp.com/getbusy.com/users/authenticate
  Request body 
  { 
  "email":"test@test.com",
  "password":"password"
  }
```
3. Define slot (POST)
```sh
> https://getbusyapi.herokuapp.com/getbusy.com/users/slot
  Request body 
  { 
  "date": "Tue, 23 Jun 2020 10:08:18 GMT",
  "time": "01:00pm"
  }

  User initially defines his available time slots
```
4. Get all slots of a user (GET)
```sh
> https://getbusyapi.herokuapp.com/getbusy.com/<unique_user_id>/slots

This url is unique for all users, as this url allows users to see the specific user's available time slots.
You can find this url in user object
```
5. Book a slot (POST)
```sh
> https://getbusyapi.herokuapp.com/getbusy.com/<unique_user_id>/slots/<unique_slot_id>
  Request body 
  { 
  "title": "Webinar on Web Development",
  "description": "Attend the webinar on web development organised by FreeCodeCamp.org"
  }

This url is unique for all slots of all users, as this url allows users book the specific user's specific time slot.
You can find this url in user object
```
