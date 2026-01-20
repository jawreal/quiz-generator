# Neuro-Quiz 

A mid level project that allows user to create a quiz based on their prompt. I did this using Termux in Android Phone since laptop was just a myth 💔.

## Root level

- I set a command for installing both dependencies in client and server for production ```npm install```. Its purpose is for deploying it as full-stack in hosting platform (e.g., Render)
- You can run the client by navigating to root folder and run ``` npm run client ``` and same goes for server  ``` npm run server ``` or just run  ``` npm run preview ```. Make sure to install the concurrently before running these. 
- Do not forget to set the command for running the server as ```npm run server``` for production. 

## Server 

- Install the dependencies first ```cd server && npm install ``` if you're in root level otherwise just ```npm install```
- See my ```env.d.ts```, you'd see the correct instance of env variables there. 
  * PORT: Just set this as 3000 ```PORT=3000```
  * NODE_ENV: Do not put it in env, platform like render automatically do it. It's just essential for env.d.ts
  * PASSPORT_SECRET: This is for session, you decide what type of secret you want to use. 
  * CEREBRAS_API_KEY: Get the key in Cerebras interference platform. ```CEREBRAS_API_KEY=your_api_key```
  * MONGODB_URI: In my case, I'm using the URI of Atlas directly — although it must be used for production. I put it directly since I did this project using Termux in Android Phone only. (give me a laptop to anyone would see this XD). I'd recommend to use the URI of compass for dev if you're gonna build this in laptop/pc. 
- You're good to go after this. 

## Client 

- Install the dependencies first same as server ```cd server && npm install ``` 
- You're good to go since I didn't do anything that's complex here aside from my code 💔💔