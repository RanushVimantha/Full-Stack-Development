# Base image for client
FROM node:alpine

WORKDIR /app/server

# Install client dependencies
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install --legacy-peer-deps


# Copy client source code
COPY ./ .

# Expose port
EXPOSE 5000

# Set entry point
CMD ["npm", "start"]