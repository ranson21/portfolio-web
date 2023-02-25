# aurora-admin-web

# Getting Started

1. Setup the environment and install dependencies

```bash
./setup.sh
```

2. Start the server

```bash
npm start
```

# Structure

## Application

All of the application code lives in the `app/` folder. Each of the parts of the application is divided by the function it provides within the app. Below is an explanation of each component of the application

**Entrypoint**

The application entrypoint is broken up into several parts, the first for local development to enable auto-reloading the browser and the remaining to enable all other functionality.

- The `root.jsx` file enables livereload features and will only have an effect on developing the app locally
- The `index.jsx` file serves as the entrypoint to the application and loads all other components through the router
- The `router.jsx` file creates the browser router and loads in all of the components of the app by wrapping each screen component in a route component
- The `routes.jsx` file defines the applicaiton routes and icons to be associated with each
- The `styles.js` file defines any global JSS styles used in the app

**Components**

Components are divided based on the screen to which they belong with more complex components having their own folder and sub-components.

- Components that are used by more than one screen live in the `shared` folder.
- Route-related components including the route wrapping component lives in the `routes` folder.
- Form components and different forms all live in the `forms` folder
- Layout components live in the `layouts` folder

**Config**

Defines any configuration used by the application including the setup for the Apollo GraphQL server as well as the initialization of the firebase application.

- The `apollo.js` file sets up the apollo connection including the authentication retry mechanism, transports, as well as any local state for the frontend
- The `constants.js` file defines any application constants
- The `firebase.js` file creates a firebase application using the environment variables for the specific firebase app
- The `theme.js` file defines the Material UI theme used in the app

**Graph**

This folder contains files corresponding to the models available in the GraphQL API. Each file defines Queries and Mutations available on that resource that can be used anywhere in the app to fetch/update those resources.

**Layouts**

This folder has only a single layout for the whole application and is where the navigation bar is position above the main content of the application.

**Screens**

Each of the routes in the application has a screen associated which will initialize the state of that screen by fetching any data from the API and setting any local state accordingly. This is usually where any interactions with the GraphQL store occur

**Store (deprecated)**

This folder was previously used to house the Redux store and state, however that has mostly been deprecated now in favor of using GraphQL. There is still 1 piece of state that is controlling parts of the application and is defined by this store which is the `isAuth` boolean. **TODO:** Replace this boolean with a value in the `MemoryStore` created by Apollo.

**Utils**

This folder contains any shared logic that should be used by either the GraphQL store or by a component for formatting purposes.

## Development

All of the setup for developing and deploying the application exists either in the `webpack/` folder or in the root folder. Below is an explanation of the function of each:

- **.babelrc**: Configures how to transpile the newer versions of JavaScript (ES6+) into code that will run in any browser
- **.env**: This file is generated by the setup script and provides configuration settings and secrets through environment variables
- **.eslintrc.js**: Sets how to lint the project, use this file to change the rules around writing JavaScript
- **.gitignore**: Ignore file
- **.prettierignore**: Ignores node_modules so that prettier doesnt complain
- **.prettierrc**: Configures how to auto-format code in the project
- **cloudbuild.yaml**: Configures the build process for Google Cloud
- **known_hosts.bitbucket**: This file is required to let Google Cloud build the repository from bitbucket
- **package-lock.json**: Dependency lock
- **package.json**: Configure dependencies and any scripts that will be used including the startup script
- **setup.sh**: Setup script to configure the environment and load secrets
- **Vagrantfile**: Builds a windows virtual machine for debugging windows issues on non-windows platforms

**Webpack**

All webpack configuration lives in the `webpack/` folder and is split up based on environment with a common configuration. Aliasing and transpilation rules as well as the application entrypoint are defined in the `webpack.common.js` file, while development server setup is in the `webpack.dev.js` file and bundle optimizations are done in `webpack.prod.js`

**src**

There are 3 folders in the source folder related to development:

1. `data/`: Defines any test data to use while building the app
2. `i18n/`: Sets the language and translations for the app (currently unused)
3. `web/`: Contains the `index.html` and any images or other static assets that will be used
