FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

RUN chgrp -R 0 /app && chmod -R g=u /app
COPY target/*.jar app.jar

USER 1001
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]