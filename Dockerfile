#replica/replica
FROM node:12.18

ENV NPM_CONFIG_LOGLEVEL info

# Create app directory
WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY . .

ADD . /home/node/app

EXPOSE 5500

#CMD ["/home/node/app/init.sh"]
#CMD [ "npm", "start" ]
