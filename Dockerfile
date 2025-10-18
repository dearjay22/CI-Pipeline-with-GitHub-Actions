# Use a small Node base
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json* ./

# Bundle app source
COPY src ./src

EXPOSE 3000

CMD ["node", "src/index.js"]
