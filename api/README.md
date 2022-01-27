# mashgin - backend

This project is the backend part of the take home assignment for the role of Software Engineer in Mashgin Inc.

This project was developed using Node + express + Typescript. Considering it was suposed to be a simple project, I decided to use only Express, instead of a more robust framework, like NestJS or Loopback, because such frameworks already do all the "heavy" work.

The API was developed in two parts:

1. The application logic, splitted in 3 layers: **controller**, **service** and **repository**. The repository is responsible for connecting to the mongodb database, using a connection provided by the **connection factory**, and provide the read and write operations. The service do the necessary logic for executing the desired tasks, like fetching a menu or saving a order, passing the necessary data to the right service that will deal with that data. At last, the container is responsible for orchestrating the requests to the searvices (given the simplicity of this particular application, the controller ended up being little used and could have been removed).  This part of the application has as main characteristic the **low coupling**: each layer receives the dependencies it needs injected in the constructor. Also, each class knows only the **interface** they need, and never knows the implementation. This way, it was very simple to garantee that each class is working properly with **unit tests** which mocks the dependencies. This part of the application does not "knows" anything about HTTP, and nor even if it is running on a server. It does not deal with HTTP requests neither RESPONSES. It only receives INPUTS and gives back OUTPUTS.

2. The second part of the application is a simple service, running on express, that create the API routes, receives the HTTP requests, convert them to the format expected by the **controller** of the "part 1" and then delegates the tasks to the controller. Also, it receives the output (or exceptions thrown)  from controller and convert the to the proper http response.

The following routes were developed:


* **GET ${BASE_URL}/menu** - Fetches the menu, in the same format of the JSON sample provided together with the task
* **POST ${BASE_URL}/orders** - Create a new order
* **GET ${BASE_URL}/orders** - List all available orders
* **GET ${BASE_URL}/images/:filename** - Serves static images saved in the **/files/images** directore (when running on docker, this directory will be mountend in **${PROJECT_ROOT}/.data-volumes/resources/images**)


A full **swagger** documentation of the API was created and the source-code of the doc is in the **swagger.json** file. When running the application, the **swagger** interface will be available in: **${BASE_URL}/doc**

![Swagger](../resources/prints/5-swagger.png?raw=true "Swagger")


## Running the Application

### Running with docker

To run the backend API application in **production mode** with docker, in the root of the project, execute:

```
docker-compose up api
```

To run the backend API application in **development mode** with docker, in the root of the project, execute:

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up api
```

**IMPORTANT**: In both cases, nunning the API container will automatically start the **database** container, too.

To run in background, use the **-d** argument:


```
docker-compose up -d api
```
or
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d api
```

To **stop** the api and remove the container, in any mode:


```
docker-compose stop api && docker-compose rm api
```

Or, to stop and remove ALL containers:


```
docker-compose down
```



### Running without docker

It is not recommended to run this project without docker, but you can do it as follows:

1. Enter the **api** subproject
```
cd ./api
```
2. install node v 14
3. install the dependencies:
```
npm install
```
4. Create the directory for holding the static images (Linux):
```
sudo mkdir /files
```

5. Copy the product images to the created directory:
```
sudo cp ../resources/sample-images/ /files/images -R
```
6. Create a **mongo** database called **checkout-db** and start it

7. Create a .env file (replace the values with the exact values you use on your application)
```
touch .env
echo DB_HOST=localhost >> .env
echo DB_PORT=27017 >> .env
echo DB_NAME=checkout-db >> .env
echo DB_USER=api >> .env
echo DB_PASSWORD=mashgin-checkout-api-123 >> .env
```

8. Start the service, with the following command:
```
npm start
```

This will run the application in port 3000



## Authomated Tests

The **backend** API was developed using Behavior-Driven-Development (BDD), and unit tests. To run the tests **inside docker container**:

```
docker exec -it api npm run test
```

To run the tests directly on your SO, outside the container, jus run:

```
npm run test
```

### Tests report

![Tests Report](../resources/prints/4-unit-tests.png?raw=true "Test Report")


## project Folder Structure

The API source code is located inside the directory ```${PROJECT_ROOT/api/src}```, and it organized as follows:

* **app.ts** - The application main script. It will create the Http Server, serve the images static folder and register the middleware for dealing with request haders.
* **swagger.json** - Swagger documentation source code (json)
* **controller**: This folder contains the **Controller** layer:
  * **menu**: Contain the MenuController, its unit tests and interface. provides the operations bounded to the /menu API route (fetch menu)
  * **order**: Contain the OrderController, its unit tests and interface.  provides the operations bounded to the /orders API route (create order, list orders)
* **service**: This folder contains the **Service** layer:
  * **menu**: Contain the MenuService, its unit tests and interface. provides business logic for fetching the menu
  * **order**: Contain the OrderService, its unit tests and interface. provides business logic for handling orders
* **repository**: This folder contains the **Repository** layer:
  * **category**: Contains the CategoryRepository, its unit tests and interface. provides access to the Categories collection in the database.
  * **order**: Contains the OrderRepository, its unit tests and interface. provides access to the Orders collection in the database.
  * **order**: Contains the ProductRepository, its unit tests and interface. provides access to the Products collection in the database.
  * **mongo-db-connection-factory.ts**: Contains the connection factory, responsible for connecting to the database using the environment variables.
* **module**: Considering this is a small application, no framework was used for dependency injection. So, this module was implemented as a responsible for orchestrate the dependency injection and providing the already initialized instances of the containers so that the **app.ts** can use it.
* **model**: definitions of each entity model.
* **exceptions**: Custom exceptions