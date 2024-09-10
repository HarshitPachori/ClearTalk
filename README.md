# `Clear Talk - A Realtime Chat Application`

This project is a `real-time chatting application with end-to-end encyption of chat messages and files` by which a registered user can chat with their friends and relatives , send emoji's & files to them also, can download shared files also. With a robust Backend in `Node Js` and `Express Js` & visualy appealing user interface or Frontend in `ReactJs` , with `Zustand` for state management , `Javascript` , `TailwindCSS` and `Shadcn-ui` for overall better user experience and easyness, we have developed this application.

## TECH STACK

- <b>`Backend`</b> : Javascript, NodeJs, ExpressJs, MongoDB, Socket.io, JWT Authentication with Http Only Cookie Storage, Yarn, Postman, etc.
- <b>`Frontend`</b> : ReactJs, React Router Dom, TailwindCSS, Shadcn-ui, Zustand, Socket.io-client, JavaScript, Yarn, etc

## Table of Contents

- [Software and Tools required](#software-and-tools-required)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [Running the Frontend](#running-the-frontend)
- [API Endpoints](#api-endpoints)

  - [Register User](#register-user)
  - [Login User](#login-user)
  - [User Profile](#user-profile)
  - [Update User Profile](#update-user-profile)
  - [Create Journal Entry](#create-journal-entry)
  - [Get All Journal Entry Of User](#get-all-journal-entry-of-user)
  - [Update Journal Entry](#update-journal-entry)

- [Responses](#responses)
  - [Success Responses](#success-responses)
  - [Error Responses](#error-responses)
- [Postman Collection](#postman-collection)
- [Snapshots](#snapshots)

## Software and Tools required

- JDK 17 or more
- NodeJs
- Git
- MongoDB Cliet or Server
- Docker
- For Backend (IDE or Editors)
  - IntelliJ Idea (Community / Ultimate)
  - Spring Tool Suite (STS)
  - Eclipse
  - NetBeans
  - Visual Studio Code (VS Code)
- For Frontend (Editors)
  - Visual Studio Code(VS Code) -> `Recommended`
  - Sublime Text

## Installation

### Clone Git Repository to your local machine

```bash
git clone https://github.com/HarshitPachori/StoryPath.git
```

### Backend

## Running the Server

- <b>Server Directory</b>

  ```bash
  cd storypath_backend
  ```

- <b>Setup Database</b>

  - Create `.env` file in root of this directory (storypath_backend) and write below `environment varibales` in to this.
    ```env
        PORT=8080
        MONGODB_URI=your mongodb cluster uri
        GMAIL_USERNAME=your gmail id
        GMAIL_APP_PASSWORD=your gmail app password
        ACTIVE_PROFILE=dev
    ```
  - Go to `ride_fast_backend/src/main/resources/application.yaml` file
    ```yaml
    spring:
      application:
        name: storypath
      config:
        import: optional:file:storypath_backend/.env[.properties]
      profiles:
        active: ${ACTIVE_PROFILE}
    server:
      port: ${PORT}
    ```

- <b>Run Server</b>
  ```bash
  ./mvnw spring-boot:run
  ```

## Running the Frontend

- <b>Client Directory</b>

  ```bash
  cd storypath_frontend
  ```

- <b>Update or Install Npm Packages</b>
  ```bash
  npm install
  ```
- <b>Move to `storypath_frontend/appConstants.js` file</b>

  - Add the following path in destination field of BASE_URL with your server url.

    ```js
    export const BASE_URL = "http://localhost:8080/api/v1";
    ```

- <b>Run Client</b>

  ```bash
  npm run dev
  ```

## API Endpoints

- ### Register User

  ```java
   @route POST /api/v1/auth/register/user
   @desc Register New User
   @param {String} username
   @param {String} email
   @param {String} password
   @returns {Object} User
   @returns {StatusCode} 201 - Created
   @returns {StatusCode} 400 - Bad Request
  ```

- ### Login User

  ```java
   @route POST /api/v1/auth/login
   @desc Login User
   @param {String} email
   @param {String} password
   @returns {Object} {String} accessToken
   @returns {StatusCode} 200 - OK
   @returns {StatusCode} 400 - Bad Request
   @returns {StatusCode} 404 - Not Found
  ```

- ### User Profile

  ```java
   @route GET /api/v1/user/profile
   @desc Get User Profile
   @Header {String} jwtToken
   @returns {Object} {String} message, {Object} User
   @returns {StatusCode} 200 - OK
   @returns {StatusCode} 400 - Bad Request
   @returns {StatusCode} 404 - Not Found
  ```

- ### Update User Profile

  ```java
   @route PUT /api/v1/user/profile?wantsSentimentAnalysis=
   @desc Get User Profile
   @Header {String} jwtToken
   @param {Boolean} wantsSentimentAnalysis
   @returns {Object} {String} message, {Object} User
   @returns {StatusCode} 200 - OK
   @returns {StatusCode} 400 - Bad Request
   @returns {StatusCode} 404 - Not Found
  ```

- ### Create Journal Entry

  ```java
   @route POST /api/v1/journal
   @desc Create New Journal Entry
   @header {Authorization} jwtToken
   @param {String} title
   @param {String} content
   @param {Array} tags
   @returns {Object} Journal Entry
   @returns {StatusCode} 201 - Created
   @returns {StatusCode} 400 - Bad Request
  ```

- ### Get All Journal Entry Of User

  ```java
   @route GET /api/v1/user/journal
   @desc Get All Journal Entry Of User
   @header {Authorization} jwtToken
   @returns {List} Journal Entry
   @returns {StatusCode} 200 - OK
   @returns {StatusCode} 400 - Bad Request
  ```

- ### Update Journal Entry

  ```java
   @route POST /api/v1/journal/123456789
   @desc Update Journal Entry
   @header {Authorization} jwtToken
   @param {String} journalId
   @param {String} title
   @param {String} content
   @param {Array} tags
   @returns {Object} Journal Entry
   @returns {StatusCode} 200 - OK
   @returns {StatusCode} 400 - Bad Request
  ```

## Responses

- ### Success Responses

  - <b>Login User/Driver (Success)</b>

    ```json
    {
      "statusCode": 200,
      "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huQGdtYWlsLmNvbSIsImlhdCI6MTcxMDY3MjMyMSwiZXhwIjoxNzExNTcyMzIxfQ.LIc-mqKb1-RRsl4W4l4emn0GDfpSXDY1Wy6NfS9-7dY",
      "message": "Login Successfully",
      "success": true
    }
    ```

- ### Error Responses

  ```json
  {
    "statusCode": 400,
    "message": "All fields are required",
    "errors": [],
    "success": false
  }
  ```

  ```json
  {
    "statusCode": 404,
    "message": "Resource Not Found with given Id",
    "errors": [],
    "success": false
  }
  ```

  ```json
  {
    "statusCode": 401,
    "message": "You need to be logged in first in order to perform this action",
    "errors": [],
    "success": false
  }
  ```

  ```json
  {
    "statusCode": 501,
    "message": "Internal Server Error",
    "errors": [],
    "success": false
  }
  ```

<!-- - ## Postman Collection

  - ### [Postman Collection Link](https://restless-moon-499399.postman.co/workspace/New-Team-Workspace~c7722ba8-7049-40b0-97c9-e367daa05b43/collection/23880545-2625be57-f365-488a-934e-4d7a9fe64389?action=share&creator=23880545)   -->

- ## Snapshots
  <img src="./snapshots/s1.png" height="500"/>&nbsp;
  <img src="./snapshots/s2.png" height="500"/>&nbsp;
  <img src="./snapshots/s3.png" height="500"/>&nbsp;
  <img src="./snapshots/s4.png" height="500"/>&nbsp;
  <img src="./snapshots/s5.png" height="500"/>&nbsp;
  <img src="./snapshots/s6.png" height="500"/>&nbsp;
  <img src="./snapshots/s7.png" height="500"/>&nbsp;
  <img src="./snapshots/s8.png" />&nbsp;
  <img src="./snapshots/s9.png" />&nbsp;
  <img src="./snapshots/s10.png" />&nbsp;
  <img src="./snapshots/s11.png" height="500"/>&nbsp;
  <img src="./snapshots/s12.png" height="500"/>&nbsp;
  <img src="./snapshots/s13.png" height="500"/>&nbsp;
  <img src="./snapshots/s14.png" />&nbsp;
  <img src="./snapshots/s17.png" />&nbsp;
  <img src="./snapshots/s16.png" />