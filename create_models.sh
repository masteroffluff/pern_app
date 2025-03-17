#!/bin/bash

# Define the base directory
BASE_DIR="/home/fluffy/Documents/Projects/pern_app/pern_app/backend"

# # Create the models directory
# mkdir -p "$BASE_DIR/models"

# List of routes based on the schema
ROUTES=(
    "login"
    "logout"
    "register"
    "authGithub"
    "user"
    "userPFP"
    "heartbeat"
    "friends"
    "friendsPotential"
    "friendsAction"
    "itemsNote"
    "itemsTodo"
    "itemsTodoItems"
    "calendar"
    "calendarAttendees"
    "wall"
    "today"
)

# Create an empty model file for each route
for ROUTE in "${ROUTES[@]}"; do
    MODEL_FILE="$BASE_DIR/models/${ROUTE}Model.js"
    cat <<EOL > "$MODEL_FILE"
// This file will contain the database interactions for the ${ROUTE}.
EOL
    echo "Created $MODEL_FILE"
done

# Output the result
echo "Created models directory and empty model files for all routes."