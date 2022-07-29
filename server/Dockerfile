FROM node:14

# Create app directory
WORKDIR /usr/src/arroyo_server

#Copy over app contents (excluding node_modules)
COPY . .

#Download node_modules
RUN npm install

EXPOSE 5001
CMD ["npm", "start"]