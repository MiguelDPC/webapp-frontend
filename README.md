# webapp-backend and webapp-frontend
NEED BOTH TO WORK

Install: 

  - Linux install:
    - sudo apt update
    - sudo apt install nodejs
    - npm install express
    - npm install pg
    - npm install connect-pg-simple
    - npm install ejs
    - Will also need docker installed: https://docs.docker.com/engine/install/ubuntu/
    - sudo apt install docker-compose-plugin
    
In webapp-backend/database
    - run sudo docker-compose up -d
      - sudo docker ps to check container
      - If not started, run sudo docker start <name-of-container>

Current Application is configured to run on https. To run on local host switch server.listen to app.listen in the index.js file located in webapp-frontend.

Finally

    run node server.js
    run node index.js
