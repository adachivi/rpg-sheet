# Usar imagem oficial do OpenJDK 17 (alpine para ser leve)
FROM eclipse-temurin:17-jdk-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar arquivos necessários para build (pom.xml, .mvn e código fonte)
COPY backend/pom.xml backend/.mvn ./backend/
COPY backend/src ./backend/src

# Tornar o wrapper do Maven executável
RUN chmod +x ./backend/mvnw

# Build da aplicação (pula testes para agilizar)
RUN ./backend/mvnw -f backend/pom.xml clean package -DskipTests

# Copiar o JAR gerado para a raiz /app
RUN cp backend/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expor a porta que o backend usa
EXPOSE 8080

# Comando para rodar o JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
