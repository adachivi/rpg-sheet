# Build stage vvv
# Base image
FROM maven:3.9.4-eclipse-temurin-21 AS build

WORKDIR /app

COPY . .

# Make the build (compile the project) and skip the tests
RUN mvn clean package -DskipTests
# ^^^ Build stage

# Run stage vvv
# Lighter base image (without the build tools)
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=build app/target/*.jar app.jar

# Run application command
CMD ["sh", "-c", "java -jar app.jar --server.port=$PORT"]
# ^^^ Run stage