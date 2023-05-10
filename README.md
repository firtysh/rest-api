# EXPRESS REST API

This is a RESTful API for managing users. Users can be created, read, updated and deleted using the API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18.x.x)
- npm (v6.x.x)

### Installing

1. Clone the repository to your local machine:

```
git clone https://github.com/firtysh/rest-api.git
```

2. Change into the project directory:

```
cd rest-api
```

3. Install the required dependencies:

```
npm install
```

4. Create a `.env` file in the root directory of the project with the following contents:

```
PORT=3000
```
It can be any port number.

### Running the app

#### Development mode

To run the app in development mode, use the following command:

```
npm run start:dev
```

The app will be running at `http://localhost:3000`.

#### Production mode

To run the app in production mode, use the following command:

```
npm run start:prod
```

This will build the app and then run the bundled file. The app will be running at `http://localhost:3000`.

#### Multi-process mode

To run the app in multi-process mode (using the Node.js `Cluster` API with a load balancer), use the following command:

```
npm run start:multi
```

The load balancer will be running at `http://localhost:3000/api`, and the worker processes will be listening on ports `3001` to `3000 + no of CPUs`.

### Running tests

To run the tests, use the following command:

```
npm test
```

This will run the tests.

## API Endpoints

The following endpoints are available:

- `GET /api/users` - Get all users
- `GET /api/users/{userId}` - Get a single user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/{userId}` - Update an existing user
- `DELETE /api/users/{userId}` - Delete an existing user

## Built With

- Node.js
- Express
- Javascript
- uuid
- Jest
- Supertest

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.