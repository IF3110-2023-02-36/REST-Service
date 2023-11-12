FROM node:21-alpine

WORKDIR /rest

COPY package*.json ./
RUN rm -rf node_modules
RUN npm install --ignore-scripts --verbose 
COPY . .


EXPOSE 5000
CMD ["./scripts/entrypoint.sh"]
