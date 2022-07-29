FROM node:14

# Create app directory
WORKDIR /usr/src/arroyo_client

#Copy over app contents (excluding node_modules)
COPY . .

#Download node_modules
RUN yarn install

EXPOSE 3000
CMD ["yarn", "start"]