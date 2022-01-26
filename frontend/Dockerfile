FROM node:14-stretch

# insert the entrypoint into docker image
ADD ./entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

RUN npm install -g serve

# insert source code into docker image
RUN mkdir /frontend
WORKDIR /frontend
COPY ./package.json .
RUN npm install
COPY . .

ENTRYPOINT ["entrypoint.sh"]

