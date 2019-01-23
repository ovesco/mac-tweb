# Colibri
File sharing collaboration system

## Introduction
This project is a small social network oriented around file sharing and allows
its user to publish, share, save and visualise files. People can tag their files
to make them easily searchable, and when they see a cool file, they can like it
or comment the corresponding activity.

## Deployment
1. Download and install ArangoDB ([arangodb.com](https://www.arangodb.com/)), connect to the dashboard and create a new database.
2. Clone this repository.
3. Execute `npm install` in `/client` and `/server`
4. In `/server`
    1. Copy `.env.dist` to `.env` and edit the file as needed
    2. Execute `npm run setup` to configure the database
    3. Execute `npm run dev` who will launch the server
5. In `/client`
    1. Copy `.env.dist` to `.env` and edit the file as needed
    2. Execute `npm run serve` to launch the client
6. Go to [localhost:8080](http://localhost:8080) to access the application!

## Credits
This project was made in the scope of the MAC-TWEB project of the HEIG-VD by Ludovic Delafontaine, Guillaume Hochet, Vincent Guidoux and Kevin Pradervand.
