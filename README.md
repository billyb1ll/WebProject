# WebProject

## Installation

To install the project dependencies for both frontend and backend, run:

```bash
npm install
```

## Running the Project

### Frontend

To start the frontend development server, follow these steps:

1. Navigate to the frontend directory:
    ```bash
    cd front
    ```
2. Install the frontend dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm run dev
    ```

This will start the Next.js development server and you can view your project at `http://localhost:3000`.

### Backend

To set up and start the backend server using Express, follow these steps:

1. Navigate to the backend directory:
    ```bash
    cd back
    ```

2. Install the backend dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    npm start
    ```

The backend server will start and listen on the port specified in your configuration (usually `http://localhost:4000/`).

### Full Setup

To run both the frontend and backend servers simultaneously, follow these steps:

1. Open two terminal windows or tabs.

2. In the first terminal, navigate to the frontend directory and start the frontend server:
    ```bash
    cd front
    npm run dev
    ```

3. In the second terminal, navigate to the backend directory and start the backend server:
    ```bash
    cd back
    npm start
    ```

Now, you should have both the frontend and backend servers running. You can interact with the frontend at `http://localhost:3000` and the backend at `http://localhost:3005`.

### Sending Data to the Backend

To send data from the frontend to the backend and display the response, follow these steps:

1. Open your browser and navigate to `http://localhost:3000`.

2. Enter some text in the input field and click the "Send" button.

3. The backend will receive the data and send a response back to the frontend, which will be displayed on the page.

### Additional Notes

- Ensure that you have [Node.js](https://nodejs.org/) installed on your machine.
- If you encounter any issues with CORS, make sure that the backend server has CORS enabled as shown in the `app.js` file.
