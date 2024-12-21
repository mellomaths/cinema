FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY src ./src
COPY pom.xml ./
RUN mvn package

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
ARG JAR_FILE=target/*.jar
COPY --from=build /app/${JAR_FILE} app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
