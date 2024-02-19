FROM node:10-alpine
RUN mkdir -p /home/node/webapp-frontend/node_modules && chown -R node:node /home/node/webapp-frontend
WORKDIR /webapp-frontend
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 3000
USER node
CMD ["node", "index.js"]
