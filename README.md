Proyecto C2-A5: Docker Compose (React, Node, MySQL)
Este proyecto implementa una aplicación web completa utilizando Docker Compose. La arquitectura consta de tres servicios interconectados: un frontend de React, un backend API de Node.js/Express y una base de datos MySQL.

El objetivo es demostrar el uso de contenedores personalizados, redes internas, volúmenes persistentes para la base de datos y la orquestación de servicios con docker-compose.

1. Servicios Incluidos
El entorno de Docker Compose (docker-compose.yml) define y levanta los siguientes 3 servicios:

frontend-andre

Tecnología: React.

Imagen: Imagen personalizada (andre/frontend-estudiantes) construida desde su propio Dockerfile.

Descripción: Sirve la aplicación de React de forma estática usando serve.

Puerto (Host): 3000

api-andre

Tecnología: Node.js con express.

Imagen: Imagen personalizada (andre/api-estudiantes) construida desde su propio Dockerfile.

Descripción: Provee una API REST para gestionar datos de estudiantes (CRUD) y se conecta a la base de datos MySQL.

Puerto (Host): 5000

db-mysql-andre

Tecnología: MySQL 8.0.

Imagen: Imagen oficial mysql:8.0.

Descripción: Almacena los datos de la aplicación. Utiliza un volumen nombrado (db-data) para garantizar la persistencia de los datos aunque el contenedor se destruya.

Puerto (Host): 3306


Flujo de Datos
Usuario -> Frontend: El usuario abre su navegador y accede a http://34.203.38.177:3000. El servidor le entrega la aplicación de React.

Frontend -> Backend : La aplicación de React 0ejecuta fetch para pedir datos a http://34.203.38.177:5000/estudiantes.

Backend -> Base de Datos: El contenedor api-andre recibe la petición. Para resolverla, se conecta a la base de datos usando el nombre del servicio (db-mysql-andre) como hostname a través de la red interna andre-net.

Base de Datos -> Backend: La base de datos devuelve los datos al backend.

Backend -> Frontend: La API formatea los datos como JSON y los devuelve al navegador del usuario.

Frontend -> Usuario: React actualiza la página y muestra la lista de estudiantes.

2. Cómo Levantar el Entorno
Sigue estos pasos para desplegar la aplicación en un servidor (ej. una instancia EC2 de AWS).

Prerrequisitos
Git instalado.

Docker y Docker Compose (plugin) instalados.

Un servidor con los puertos 3000 y 5000 abiertos en sus reglas de entrada (Security Group en AWS).

Pasos para el Despliegue
Clonar el repositorio:

Bash

git clone https://github.com/Andresito126/Microservicios-docker
cd Microservicios-docker/

Construir y Levantar los Servicios: Desde la carpeta raíz del proyecto (donde está el docker-compose.yml), ejecuta:

sudo docker compose up --build
--build fuerza a Docker a reconstruir tus imágenes personalizadas  con los últimos cambios.

3. Verificación y Pruebas
Una vez que el comando anterior termine y los logs se estabilicen, puedes probar la aplicación:

Probar el Frontend:

Abre tu navegador y ve a http://34.203.38.177:3000.

Deberías ver la página de React, con mi nombre y los datos de la api consumiendose.

Probar la API (Directamente):

Puedes probar los endpoints de la API en http://34.203.38.177:5000/apellido o .../estudiantes.

