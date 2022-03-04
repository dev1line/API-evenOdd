FROM node:16.3.0-alpine

# Prepare Data
RUN mkdir app
WORKDIR /app
COPY artifacts ./artifacts
COPY src ./src
COPY .env .
COPY package.json .
COPY nest-cli.json .
COPY tsconfig.json .
COPY tsconfig.build.json .

# Install dependencies
RUN npm i

# Build and run source
RUN npm run build
CMD ["npm","run", "start:prod"]