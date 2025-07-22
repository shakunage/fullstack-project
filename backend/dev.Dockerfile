FROM node:22.13.1

WORKDIR /usr/src/fullstack-project/backend

COPY . .

RUN npm ci

EXPOSE 8080
EXPOSE 5555

CMD ["npm", "run", "dev"]