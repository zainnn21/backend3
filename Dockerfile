# Using base image official Bun
FROM oven/bun:1

# Make directory inside container
WORKDIR /usr/src/app

# Copy file package manager
COPY package.json bun.lock ./

# Run instalasi Inside IMAGE
RUN bun install

# Copy rest code application
COPY . .

CMD [ "bun", "run", "dev" ]