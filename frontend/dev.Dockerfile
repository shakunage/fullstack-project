FROM node:22.13.1

WORKDIR /usr/src/fullstack-project

COPY . .

RUN rm -rf node_modules && rm -f package-lock.json

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]