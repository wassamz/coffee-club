#Base this image from the official Node version
FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Bind and expose the node server port
EXPOSE 8000

# Start server
CMD [ "npm", "start" ]