# mashgin - backend

This project is the backend part of the take home assignment for the role of Software Engineer in Mashgin Inc.

This project was developed using Node + express + Typescript. Considering it was suposed to be a simple project, I decided to use only Express, instead of a more robust framework, like Nest or Loopback, beckouse such frameworks "hides" most of the necesary code to execute simple tasks like providing GET and POST urls, so it would be dificult to evaluete my real code quality and my knownledge.

The application was developed in two parts:

1. The application logic, splitted in 3 layers: **controller**, **service** and **repository**. The repository is responsible for connecting to the mongodb database, using a connection provided by the **connection factory**, and provide the read and write operations. The service do the necessary logic for executing the desired tasks, like fetching a menu or saving a order, passing the necessary data to the right service that will deal with that data. At last, the container is responsible for orchestrating the requests to the searvices (given the simplicity of this application, the controller turned out not to be needed).  This part of the application has as main characteristic the **low coupling**: each layer receives what it needs injected in the constructor. Also, each class knows only the **interface** they need, and never knows the implementation. This way, it was very simple to garantee that each class is working properly with **unit tests** which mocks the dependencies. This part of the application does not "knows" anything about HTTP, and nor even that is running on a server. It does not deal with HTTP requests neither RESPONSES. It only receives INOUTS and gives back OUTPUTS.

2. The second part of the application is a simple service, running on express, that create the API routes, receives the HTTP requests, convert them to the format expected by the **controller** of the "part 1" and then delegates the tasks to the controller. Also, it receives the output (or exceptions thrown)  from controller and convert the to the proper http response.

The following routes were developed:


* **GET ${BASE_URL}/menu** - Fetches the menu, in the same format of the JSON sample provided together with the task
* **POST ${BASE_URL}/orders** - Create a new order
* **GET ${BASE_URL}/orders** - List all available orders
* **GET ${BASE_URL}/images/:filename** - Serves static images saved in the **/files/images** directore (when running on docker, this directory will be mountend in **${PROJECT_ROOT}/.data-volumes/resources/images**)


A full documentation of the API was created for **swagger**, and the source-code of the doc is in the **swagger.json** file. When running the application, the **swagger** interface will be available in: **${BASE_URL}/doc**


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
sudo cp ./resources/sample-images/ /files/images -R
```
6. Create a mongo database called **checkout-db** and start it

7. Create a .env file (replace the values with the exact values you use on your application)
```
touch .env
echo DB_HOST: localhost >> .env
echo DB_PORT: 27017 >> .env
echo DB_NAME: checkout-db >> .env
echo DB_USER: api >> .env
echo DB_PASSWORD: mashgin-checkout-api-123 >> .env
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

![Tests Report](../resources/prints/4-unit-tests.png?raw=true "Title")
