FROM openjdk:17
ARG JAR_FILE=target/clubmanager-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} clubmanager.jar
ENTRYPOINT ["java","-jar","/clubmanager.jar"]
EXPOSE 8080