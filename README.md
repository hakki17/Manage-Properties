# Sistema CRUD de Gestión de Propiedades - Despliegue en AWS

## Resumen del Proyecto
Sistema web para gestión de propiedades inmobiliarias con operaciones CRUD (Crear, Leer, Actualizar, Eliminar), desplegado en AWS con arquitectura distribuida usando Docker.

## Video funcionamiento
https://youtu.be/NnYa5hx0hWs

## Arquitectura del Sistema

### Componentes
- **Frontend**: HTML + JavaScript
- **Backend**: Spring Boot REST API (Java 17)
- **Base de Datos**: MySQL 
- **Contenedores**: Docker para empaquetado
- **Infraestructura**: 2 instancias EC2 en AWS

### Distribución en AWS
- **Instancia 1**: MySQL Database (IP: 54.225.47.98)
- **Instancia 2**: Backend Spring Boot (IP: 3.82.46.79)

## Proceso de Despliegue

### Paso 1: Preparación Local
1. Compilar el proyecto Spring Boot:
```bash
mvn clean package -DskipTests
```

### Paso 2: Construcción de Imagen Docker
![Docker Build](https://github.com/hakki17/Manage-Properties/blob/main/img/1.dockerbuild--taghakki17.png)
```bash
docker build --tag hakki17/property-management .
```

![Docker Images](https://github.com/hakki17/Manage-Properties/blob/main/img/2.docker%20images.png)

### Paso 3: Subir a Docker Hub
![Docker Login](https://github.com/hakki17/Manage-Properties/blob/main/img/3.docker%20login.png)
```bash
docker login
docker push hakki17/property-management
```
![Docker Push](https://github.com/hakki17/Manage-Properties/blob/main/img/4.docker%20push%20hakki17....png)

### Paso 4: Verificación en Docker Hub
![Docker Hub Repository](https://github.com/hakki17/Manage-Properties/blob/main/img/5.repositrio%20en%20docker%20hub.png)

### Paso 5: Configuración de Instancia MySQL en AWS
1. Conectar por SSH:
```bash
ssh -i property-key.pem ec2-user@54.225.47.98
```
![SSH Connection](https://github.com/hakki17/Manage-Properties/blob/main/img/6.ssh%20-i%20property-key....png)

2. Instalar Docker y ejecutar MySQL:
```bash
sudo yum update -y
sudo yum install docker -y
sudo service docker start
docker run -p 3306:3306 --name mysql-properties
  -e MYSQL_ROOT_PASSWORD='farruko67R%&?'
  -e MYSQL_DATABASE=property_management
  -d mysql:latest
```
![Docker Run MySQL](https://github.com/hakki17/Manage-Properties/blob/main/img/8.docker%20run%20-p%203306....png)

3. Verificar estado:
![Docker PS](https://github.com/hakki17/Manage-Properties/blob/main/img/9.%20docker%20ps.png)

### Paso 6: Configuración de Instancia Backend
1. Desplegar aplicación Spring Boot:
```bash
docker pull hakki17/property-management
docker run -d -p 8080:8080 --name property-management-app \
  hakki17/property-management:latest
```

2. Verificar estado:
![Docker PS](https://github.com/hakki17/Manage-Properties/blob/main/img/9.%20docker%20ps.png)

### Paso 7: Pruebas del Sistema

#### Operaciones CRUD
![Property Management UI](https://github.com/hakki17/Manage-Properties/blob/main/img/10.prueba%20funciona%201.png)
![Property List](https://github.com/hakki17/Manage-Properties/blob/main/img/11.prueba%20funciona%202.png)
![CRUD Operations](https://github.com/hakki17/Manage-Properties/blob/main/img/12.prueba%20funciona%203.png)
![Property Details](https://github.com/hakki17/Manage-Properties/blob/main/img/13.prueba%20funciona%204.png)
![Property Update](https://github.com/hakki17/Manage-Properties/blob/main/img/14.prueba%20funciona%205.png)

## Estructura del Proyecto

![](https://github.com/hakki17/Manage-Properties/blob/main/img/14.tree.png)

## Configuración

### Dockerfile
```dockerfile
FROM openjdk:17
WORKDIR /app
COPY target/property-management-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENV SPRING_DATASOURCE_URL=jdbc:mysql://54.225.47.98:3306/property_management
ENV SPRING_DATASOURCE_USERNAME=root
ENV SPRING_DATASOURCE_PASSWORD=farruko67R%&?
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### application.properties
```properties
spring.datasource.url=jdbc:mysql://54.225.47.98:3306/property_management
spring.datasource.username=root
spring.datasource.password=farruko67R%&?
spring.jpa.hibernate.ddl-auto=update
server.port=8080
```

## URLs de Acceso

- **API REST**: http://3.82.46.79:8080/api/properties
- **Frontend**: http://3.82.46.79:8080

## Video Demostración
![Video Demo](https://youtu.be/NnYa5hx0hWs)

[Ver video de despliegue completo]

## Funcionalidades Implementadas

- ✅ Crear nuevas propiedades
- ✅ Listar todas las propiedades
- ✅ Ver detalles de propiedad individual
- ✅ Actualizar información de propiedades
- ✅ Eliminar propiedades
- ✅ Validación de datos en frontend
- ✅ Manejo de errores en backend
- ✅ Persistencia en base de datos MySQL

## Autor
- **Usuario Docker Hub**: hakki17
- **Repositorio**: hakki17/property-management

---
*Proyecto desplegado exitosamente en AWS con arquitectura de microservicios usando Docker*