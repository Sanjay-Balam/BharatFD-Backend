# Use official Bun image
FROM oven/bun:1.1.4-slim

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json bun.lockb ./
COPY src/prisma ./prisma/  

# Install dependencies
RUN bun install

# Copy remaining files (including src directory)
COPY . .

# Build application
RUN bun run build

# Generate Prisma client
RUN cd src && bunx prisma generate
RUN cd src && bunx prisma migrate deploy

# Expose application port
EXPOSE 3000

# Start command
CMD ["bun", "run", "dev"]