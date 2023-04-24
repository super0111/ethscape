# EthScape Forum

Fully responsive, multilingual, NodeJs forum app built using Mongoose, ExpressJs, React, Socket.IO, JWT.

![image](https://user-images.githubusercontent.com/44801711/216751239-8511fe4a-cbc8-4340-98e6-62280fe0cfe9.png)

## Installation
- Clone and install dependencies
  - `git clone https://github.com/KennethAshworth/ethscape-forum.git`
  - `cd ethscape-forum`
  - `npm install`

  - And install for client
    - `cd client`
    - `npm install`

- Install MongoDB Compass and setup a database called ethscape-forum

- Fill environment (copy file `.env.development` to `.env`)
  - `PORT` - Express server port
  - `BACKEND` - The address where located backend
  - `CLIENT` - The address where located the react client. The backend and client must point to each other and can be the same if running on the same address
  - `MONGODB` - Your MongoDB url (ex: mongodb://localhost:27017/ethscape-forum)
  - `SECRET` - You can generate a secret key by execute the `/src/modules/utils/generate_keys.js` file in console

- Set backend address for client in file `/client/src/support/Constants.js` (Will have env checking in future)

## Launch
  - Go to the client folder `cd client`
  - Build client production build with the command `npm run build` or run with the command `npm start`
  - Run backend with the command `npm start` or in development mode `npm run dev`

## Admin Access
  - Create your user by signing up
  - Update your user role in mongodb to the number 2 for access to admin dashboard
  - Sign out and back in to refresh your local user data with the admin role
  - Allows the creation for boards, banning, and content moderation

## Deployment
  - Deploying changes to the dapp to a live server requires logging into the the digital ocean web console (You may need to reset the root password to gain access)
  - Once on the server navigate to ~/apps/ethscape-forum
  - Run a `git pull` on the master branch to fetch the latest code
  - If any new packages were installed in the client directory then run a `npm install` and then `npm run build` to setup the frontend changes on the server
  - If any new packages were installed for the ethscape server the an `npm install` is needed
  - Lastly Restart the app via `pm2 restart 0`, pm2 is a command line tool to keep programs alive
  - Using `pm2 list` will show the dapp as being online or turned off
