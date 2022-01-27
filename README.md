# Mashgin take-home assignment - Checkout Application

![Categories Screen](./resources/prints/1-categories.png?raw=true "Categories")

take-home assignment for the position of software engineer

This README file contains information about the general project (frontend and backend) and how to execute it.

To obtain specific details about organization and archtecture of each projec, please check the README.md file inside their respective project folders.

## General operation of the application

This is a checkout application in which a user can add products to a cart, filter the products by category, fill a payment form and submit the order.

This full project is composed of 3 parts:

* **Frontend**, developed with React + Typescript. The project is in the **frontend** directory (Please, see the [./frontend/README.md](/frontend/README.md) file for more information)
* **Backend**, The backend API, developed with Node + Express + Typescript. The project is in the **api** directory (Please, see the [./api/README.md](/api/README.md) for more information)
* **Database**, a mongodb database, used for storing the **Products** and **Categories** that composes the **Menu**, and the submited **Orders**.

This application was designed to work with **docker**, and each of the 3 parts described above runs in a different **docker container**, orchestrated by the **docker-compose**, using the **docker-compose.yml** file.

When starting the containers, database and static images directory will be automatically created and populated with initial data, found int the **resources** directory. All the docker volumes will be created in then path:

* **${PROJECT_ROOT}/.data-volumes/database** - Contains all the data base files
* **${PROJECT_ROOT}/.files/images** - Contains all the image files served by the **api** application


When the **api** docker container runs for the **first time**, a volume will be created in the **.data-volumes** directory, inside this project root directory. In his folder, the volume  **.data-volumes/files** will be created and initiated with all the **sample images** from the **resources** folder (the images that were provided to me together with the project specifications). Once the volume is initialized, the sample data will not be used anymore, and changes made in the volume will NOT be overwritten, so you can add or remove images to the volume and the application will serve them, with no risk of losing data.

When the **database** docker container runs for the **first time**, a database will be automatically created e filled with the initial data from the **resources/sample-menu.json** file, which is the sample file provided to me together with the specifications of the project. After the database is created, the JSON is not used anymore, so no changes in the database will not be lost even if you restart the container (The only way to make the sample data be filled to database again is deleting the database volume. The  **clear-db.sh** bash script, in the project root, can be used for that.)


## Running the Application


### prerequisites

The application was designed to be run with **docker** and **docker-compose**. So it encapsulates all the configuration complexity. More ahead, in the README of each project, I will describe how to run the services without docker, but it is strogly recommended that you prefer to run it using docker.

So, before initiating the application, it is necessary to have docker and docker-compose installed:


1. [Install Docker](https://docs.docker.com/v17.12/install/linux/docker-ce/ubuntu/#install-using-the-repository/). **WARNING:** this link points to docker installation for '''UBUNTU'''. For other distributions, search for the correct link in the page
2. [Configure docker for non-root user](https://docs.docker.com/v17.12/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user)
3. [Install Docker Compose](https://docs.docker.com/compose/install/)
4. Install Node 14 and NPM

### Installation

1. First create a **.env** from the **.env.example** (in the root of this project):

```
cp .env.example .env
```

This .env file already have all the necessary information, but you can change the Ports in which each service will run. By default, the following ports will be used:

* **api**: 3000
* **frontend**: 3001
* **database**: 27018

2. Build the images

This will generate the 3 docker images. This process can take some minutes, but it just need to be done once.

```
docker-compose build --no-cache
```

3. Run the containers

The containers can be run in two different modes: **production** and **development**.

When running in **production** mode, the frontend will run as static files and the backend api will run without watching source-code for changes. This increases performance. Also, in production mode, the application will always run the source code as it was in the build moment, so it is more reliable for production. So, if you make changes to the source code it will not be available in the container until you run docker-compose build again, to generate a new release.

When running in **development** mode, a **volume** will be mounted, linking the souce-code to the container, and both frontend and backend will run in development mode, being automatically compiled everytime changes are made to source code.

The database will always behave the same in both modes.

To run the application in **production** mode:

```
docker-compose up
```

To run the application in **development** mode:

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

**IMPORTANT**: It is not necessary to make a new build in order to switch between the production and development modes. You just need to stop the services and start them again using the necessary command.



4. If everythink goes alright, the following links will be available (if you change the **ports** in the .env file, don`t forget to change them in the links):

* [http://localhost:3000](http://localhost:3000) - The backend api. Acessing this link you will see a quick reference about the endpoints available in the Api and a link to **swagger**
* [http://localhost:3000/doc](http://localhost:3000/doc) - The api **documentation**, using **swagger**
* [http://localhost:3001](http://localhost:3001) - The frontend application. it may take a few moments (**about 1 minute**) to become available
* [http://localhost:3001/storybook/](http://localhost:3001/storybook/) - (Don`t forget the "/" in the end of path. It will not work without it) The **documentation** of all the components of the application, using **storybook**.  This link will only be available when running the application in **production** mode. To see it in development, please run it manually (inside the ./frontend directory, run ```npm run storybook```)


5. To **stop** the application (in any mode):

```
docker-compose down
```

## Authomated Tests

The **backend** API was developed using Behavior-Driven-Development (BDD), and unit tests. To run the tests **inside docker container**:

```
docker exec -it api npm run test
```

To run the tests directly on your SO, outside the container, jus run:

```
cd ./api
npm run test
```


## The database

If you wnant to connect to the database to see the data, using robomongo, DBeaver or any other Database management software, use the following connection parameters:

```
DB_HOST=localhost
DB_PORT=27018   (may be different, if you exchange the variable in .env)
DB_NAME=checkout-db
DB_USER=api
DB_PASSWORD=mashgin-checkout-api-123
```



## More details...

To see more details about each project:

* [See the frontend documentation in /frontend](/frontend/README.md)
* [See the api documentation in /api](/api/README.md)
