# 1. Base Image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy dependencies
COPY package.json package-lock.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the code
COPY . .

# 6. Set environment variables (optional, depending on your env usage)
ENV NODE_ENV=production
ENV DATABASE_URL="file:./dev.db"

# 7. Prisma generate (CRITICAL for Next.js + Prisma)
RUN npx prisma generate

# 8. Build Next.js app
RUN npm run build

# 9. Expose and start
EXPOSE 3000
CMD ["npm", "run", "start"]
