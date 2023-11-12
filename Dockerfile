FROM node:16-alpine

WORKDIR /rest

COPY package*.json ./
RUN rm -rf node_modules
RUN npm install --verbose
COPY . .

RUN npx prisma generate

EXPOSE 5000
CMD ["npm", "run", "dev"]

