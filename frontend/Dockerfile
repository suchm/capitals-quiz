FROM node:20-bullseye

WORKDIR /app/frontend

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies inside the container
RUN npm install --force

# Copy the rest of the application
COPY . .

# Expose Vite's development port
EXPOSE 5173

# Start Vite development server
CMD ["npm", "run", "dev", "--", "--host"]
