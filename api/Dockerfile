FROM node:14-stretch

# insert the entrypoint into docker image
ADD ./entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

# insert source code into docker image
RUN mkdir /api
WORKDIR /api
COPY ./package.json .
RUN npm install
COPY . .

EXPOSE 3000
ENTRYPOINT ["entrypoint.sh"]

