#Base this image from the official Node version
FROM node

# Create app directory
RUN mkdir -p /usr/src/www
WORKDIR /usr/src/www

# Install app dependencies
COPY package.json /usr/src/www/
RUN npm install

# Bundle app source
COPY . /usr/src/www

# Bind and expose the web server port
EXPOSE 4200

# Start web server
CMD [ "npm", "start" ]