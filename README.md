# ChatApp

![image](https://github.com/shubhatRashid/ChatApp/assets/106548827/91ba149a-8103-4649-9ffd-00bf3b224499)
![image](https://github.com/shubhatRashid/ChatApp/assets/106548827/4a6aece8-f34e-43fb-802b-693a709c686a)


# Live @ https://chatappshubhat.vercel.app/
# MERN Stack Chat Application Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [User Authentication](#user-authentication)
7. [User Search and Chat](#user-search-and-chat)
8. [Group Chat](#group-chat)
9. [Real-time Messaging](#real-time-messaging)
10. [Central State Management](#central-state-management)
11. [Conclusion](#conclusion)

## 1. Introduction
Welcome to our MERN stack Chat Application documentation! This document provides an in-depth guide on how to use our chat app, built using the MERN stack. The application allows users to sign up, log in, search for other users, start one-on-one chats, and create group chats with their friends.

## 2. Features
- User Authentication: Users can sign up and log in securely.
- User Search: Users can search for other registered users.
- One-on-One Chat: Users can start individual chat sessions.
- Group Chat: Users can create groups and chat with multiple friends.
- Real-time Messaging: Real-time messaging functionality is achieved using Socket.io.
- Central State Management: The app uses Context API for state management.
- Mongo-db for database : The app uses mongo-db for storing user data and chats

## 3. Technologies Used
- **Frontend**: Create React App, React, Context API
- **Backend**: Node.js, Express.js, MongoDB
- **DataBase**:MongoDB
- **Real-time Messaging**: Socket.io
- **Authentication**: JSON Web Tokens (JWT)

## 4. Installation
1. Clone the repository: `git clone <repository-url>`
2. Change directory: `cd <project-folder>`
3. Install server dependencies: `npm install`
4. Change to the client directory: `cd client`
5. Install client dependencies: `npm install`

## 5. Usage
To run the application locally:
1. Create .env in both client and server folders and the following details
     Client : REACT_APP_SERVER_PORT : your backend url where you have hosted the backend or simply the port where your backend is running
     Server : MONGO_URL = mongodb cluster url
              PORT = the port number you want your backend to function from usually 3000/5000
              JWT_SECRET = your jwt secret key
              CLIENT_URL = your frontend url or port
2. Start the server: `npm start` in the root directory.
3. Start the client: `cd client && npm start`.
   

## 6. User Authentication
Users can sign up and log in to the application. Upon successful authentication, users receive a JSON Web Token (JWT) that is used to authenticate and authorize subsequent requests.

## 7. User Search and Chat
Users can search for other registered users by their username or email. Once a user is found, they can start a one-on-one chat session.

### Functionality:
- **Search**: Users can search for other users by username or email.
- **Chat**: Users can send and receive text messages in real-time.

## 8. Group Chat
Users can create groups and add multiple friends to the group. Group members can send and receive messages within the group.

### Functionality:
- **Create Group**: Users can create a new group and add friends.
- **Group Chat**: Real-time messaging within the group.

## 9. Real-time Messaging
Real-time messaging functionality is implemented using Socket.io. Users receive messages instantly without the need to refresh the page.

## 10. Central State Management
The application uses Context API for central state management. This allows components to access the application state without having to pass props through every level of the component tree.

## 11. Conclusion
Thank you for using our Chat Application! We hope this documentation provides a clear understanding of the app's features and functionalities. If you have any further questions or issues, please don't hesitate to reach out to our support team. Happy chatting!
