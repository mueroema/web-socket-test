FROM registry.access.redhat.com/ubi8/nodejs-12

# Add application sources
ADD server.js .

# Install the dependencies
RUN npm install ws

# Run application
CMD ["node", "server.js"]

EXPOSE 8080

