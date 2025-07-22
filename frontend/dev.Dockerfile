FROM node:22.13.1

WORKDIR /usr/src/fullstack-project/frontend

COPY . .

RUN rm -rf node_modules

RUN npm ci

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]