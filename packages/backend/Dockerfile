# Use the official Node.js 18 image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Crea un build
RUN npm run build

# Expose port 3000
EXPOSE 3000 4000

# Command to run the application
CMD ["npm", "start"]
