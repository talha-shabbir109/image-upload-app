# 1. Base Image
FROM node:20-alpine

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# 4. Install production dependencies
RUN npm install

# 5. Copy the entire project
COPY . .

# 6. Build the Next.js app
RUN npm run build

# 7. Expose port (important for Azure)
EXPOSE 3000

# 8. Start the app
CMD ["npm", "run", "start"]
