# Event Planner Project Reference

## Running the Project

Follow these steps to run the Event Planner project:

! If you encounter any issues creating postgres tables, go to app.ts:30 and set ```force: true ```

1. Go to the `__dev_resources` directory and run the following command to start the database with Docker:

    ```
    docker-compose up -d
    ```

2. Go to the `backend` folder and run the following commands:

    ```
    npm install
    npm start
    ```

3. Go to the `client` folder and run the following commands:

    ```
    npm install
    npm start
    ```

## Backend Routes

### Events Routes

#### `GET /api/v1/events/:userId`

Retrieve events associated with a specific user.

Example (userId is stored in localStorage):
```
GET /api/v1/events/123-dsfa-321-das-21
```

#### `POST /api/v1/categories`

Add categories

payload:
```
{
    "title": "Social"
}
```


#### `POST /api/v1/events`

Add events

payload:
```
{
    "title": "My new event",
    "owner": "John Doe",
    "category": "1",
    "startDate": "2023-08-13T11:30:00.000Z"
}
```

#### `PUT /api/v1/events/{eventId}/{userId}`

Subscribe/unsubscribe user to events

Example route (userId is stored in localStorage):
```
/api/v1//events/1/123-dsfa-321-das-21
```

