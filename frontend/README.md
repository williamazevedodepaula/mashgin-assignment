# mashgin - frontend


This project is the frontend part of the take home assignment for the role of Software Engineer in Mashgin Inc.

This project was developed using React and Typescript. It was used the react **functional** syntax, together with the **react hooks**.

Also, it was used the  [Mterial Design for Bootstrap CSS framework](https://mdbootstrap.com/).

This application was developed using the concept of [Component Driven User Interfaces](https://www.componentdriven.org/). To achieve this goal, first it was developed small reusable atomic components, like buttoms, dropdowns and cards. The, these components were combined to create components with higher level of abstraction, like cards for displaying products, for example. At last, higher components were created, containing the main views (or screens) for the application, using the smaller components. All these components - even the screens/views - have some characteristics in common:

* All of them are defined ONLY by its inputs (props) and outputs (events)
* A component only "knows" its children
* A component reveive inputs ONLY from its parent
* A component produces outputs ONLY for its parent (emit envents)
* NONE of these components receive any information by any other means (API, files, local storage)

Using this principle, the entire user interface was developed as a collection (or library) of visual-only components.

All of these components were developed independently of any application, using the [storybook](https://storybook.js.org/), where is possible to test all components, mocking all possible input/outputs, without the need of runnin the application neither the API.

When all the User Interface development was completed, the business-logic and access to data was "Connected" to the Screen/view components, using a "Controller" component. By the principle of single responsability, the controller component only orchestrate data and delegates UI to the View/screen components.

In larger applications, many Controller (also called container) components can be used (one by route, for example). But, in order to keep this project as simple as possible, and considering that it has a very small amount of requirements, I decided to keep all the Controller logic in a single component: The **App.tsx** component. It is the only component that fetches data from the API and sends data to it, too. Also, it is the component who decides, based on user actions, which view/screen will be displayed. 3 different views were implemented for this application:

* **Categories**: Displays the categories so the user can click in one of them to see the products
* **Products**: Displays all the products inside a category (or all the products, if no category is selected)
* **Checkout**: Displays a form in which the user can inform payment data and submit the order to the API, storing it in the database

Considering that it was necessary only 3 views/pages and that all application data (order and menu) lives througth the 3 views (the user goes from one view to another, putting items into the order), then the decision of using only a single Container made it possible to provide a single page application without need of any **routing** framework and neither **redux** or any other similar library for controlling shared state.

## Running Storybook

To run [storybook](https://storybook.js.org/) and see/test the developed component library, you can do it in two different ways:

1. Runnin the storybook from commandline:

```
cd ./frontend
npm run storybook
```

**IMPORTANT**: it may happen that you have permission issues. If it happens, just run a chmod in the node_modules folder: ```chmod 777 node_modules -R```

2. Run the application in **production mode** (see the main README.md) and then go to [http://localhost:3001/storybook/](http://localhost:3001/storybook/) (Don`t forget the "/" in the end of the address).

![Storybook](../resources/prints/6-storybook.png?raw=true "Storybook")


## Running the Application

### Running with docker

To run the frontend application in **production mode** with docker, in the root of the project, execute:

```
docker-compose up frontend
```

To run the frontend application in **development mode** with docker, in the root of the project, execute:

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up frontend
```

To run in background, use the **-d** argument:

```
docker-compose up -d frontend
```
or
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d frontend
```

To **stop** the frontend application and remove the container, in any mode:

```
docker-compose stop frontend && docker-compose rm frontend
```

Or, to stop and remove ALL containers:


```
docker-compose down
```



### Running without docker

It is not recommended to run this project without docker, but you can do it as follows:

1. install node v 14
2. install the dependencies:
```
npm install
```
3. run the following command (you can change the PORT variable for another)
```
PORT=3001 npm start
```

This will run the application in port 3001 and **point it for the API in port 3000**

The application will be available in [http://localhost:3001](http://localhost:3001)

## Prints

### Categories screen

![Categories Screen](../resources/prints/1-categories.png?raw=true "Categories")


### Products screen

![Products Screen](../resources/prints/2-products.png?raw=true "Products")

### Checkout screen

![Checkout Screen](../resources/prints/3-checkout.png?raw=true "Checkout")




## project Folder Structure

The frontend source code is located inside the directory ```${PROJECT_ROOT/frontend/src}```, and it organized as follows:

* **index.tsx** - The application main script. It will bind the React App component to the DOM
* **types** - Contains the type definitions of the manipulated entities
* **components** - Mos important folder! All application components are located here
  * **App.tsx** - The main react component. For this small application, it was used as **Controller**, being the only one component allowed to acces the "outside world", orchestrating the pages/views to be displayed, connecting to the api and storing the information shared between multiple views.
  * **ui/atoms** - This folder contains all the small UI components used in the application. Each component is inside its own folder, containing the component and its story file, for being displayed on **storybook**.
  * **ui/pages** - This folder contains all the page/views UI components used in the application. Each component is inside its own folder, containing the component and its story file, for being displayed on **storybook**.
    * **categories** - Layout implementation of the Categories page
    * **products** - Layout implementation of the Products page
    * **checkout** - Layout implementation of the Checkout page