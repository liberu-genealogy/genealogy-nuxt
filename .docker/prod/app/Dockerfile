# Build arguments
ARG IMAGE_REGISTRY=familytree365
ARG IMAGE_TAG=latest

# Image
#FROM ${IMAGE_REGISTRY}/nuxt:${IMAGE_TAG}

# Image
FROM node:16-alpine

# Set up the working directory
WORKDIR /var/www/html

# Specify the host variable
ENV HOST 0.0.0.0

# Expose the Nuxt port
EXPOSE 3000

# Run the Nuxt service
CMD ["yarn", "dev"]