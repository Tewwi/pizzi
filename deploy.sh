#!/bin/bash
# Pull latest changes
git pull

# Build and start containers
docker-compose down
docker-compose up --build -d

# Clean up unused images
docker image prune -f