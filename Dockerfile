FROM node:20-alpine
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig.json ./
COPY src src
RUN npm ci
CMD ["npm", "run", "start"]
