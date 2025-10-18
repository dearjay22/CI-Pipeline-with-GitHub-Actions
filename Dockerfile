# Use a small Node base
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Bundle app source
COPY src ./src

EXPOSE 3000
ENV PORT=3000

CMD ["node", "src/index.js"]
