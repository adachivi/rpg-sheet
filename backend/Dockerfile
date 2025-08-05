# Etapa 1: Build
FROM maven:3.9.4-eclipse-temurin-21 AS build

WORKDIR /app

# Copia os arquivos do backend para o container
COPY . .

# Faz o build do projeto, gerando o .jar (pula os testes)
RUN mvn clean package -DskipTests

# Etapa 2: Run
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copia o .jar gerado na etapa de build
COPY --from=build app/target/*.jar app.jar

# Expõe a porta padrão do Spring Boot (ajuste se for outra)
EXPOSE 8080

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=${PORT}"]
