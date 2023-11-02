FROM node:16-alpine

WORKDIR /rest

COPY . .
RUN npm install

EXPOSE 5000
CMD ["npm", "run", "dev"]

