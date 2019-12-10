FROM node:alpine

RUN npm install ws 
RUN mkdir /app && \
    chmod a+rw /app
ADD server.js /app/server.js
WORKDIR /app

CMD ["node", "server.js"]

EXPOSE 8080
