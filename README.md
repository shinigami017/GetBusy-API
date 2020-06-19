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
> http://localhost:4000/users/register 
  Request body
 { 
  "name":"test",
  "email":"test@test.com",
  "password":"password"
  }
```
2. Login User (POST)
```sh
> http://localhost:4000/users/authenticate
  Request body 
  { 
  "email":"test@test.com",
  "password":"password"
  }
```
