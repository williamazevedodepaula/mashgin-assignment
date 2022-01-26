FROM node:14-stretch

# insert the entrypoint into docker image
ADD ./entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

RUN npm install -g serve

# insert source code into docker image
RUN mkdir /frontend
RUN mkdir /frontend/temp
WORKDIR /frontend/temp
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm run build-storybook
WORKDIR /frontend
RUN mv ./temp/build/* ./
RUN mv ./temp/storybook-static ./storybook
RUN rm ./temp -R


EXPOSE 3000
ENTRYPOINT ["entrypoint.sh"]

