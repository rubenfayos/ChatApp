# Use Node.js image as the base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm run build

# Expose port if needed (if npm start uses a specific port)
EXPOSE 4173 5173

# Command to run the application
CMD ["npm", "run", "preview"]
