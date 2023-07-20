# Node.js-SQLite
servidor Node.js con SQLite
Instrucciones de uso del servidor Node.js con SQLite

Este informe proporciona instrucciones detalladas sobre cómo revisar y probar el código de un servidor Node.js que utiliza SQLite como base de datos. 
Sigue los pasos a continuación para garantizar una correcta revisión y ejecución del código.

Requisitos previos:

Antes de comenzar, asegúrate de tener instalado Node.js en tu sistema. Puedes verificar si Node.js está instalado ejecutando el siguiente comando en tu terminal:

node --version
Si Node.js no está instalado, puedes descargarlo e instalarlo desde el sitio web oficial de Node.js (https://nodejs.org)

Abre una terminal y navega hasta la ubicación donde guardaste el archivo
Instala las dependencias necesarias ejecutando el siguiente comando en la terminal:

npm install express sqlite3

Esto instalará las dependencias express y sqlite3 que son requeridas por el servidor.

Una vez que las dependencias se hayan instalado correctamente, 
puedes abrir el rar actividad2si en un compilador de codigo como visual studio code y  ejecutar el servidor Node.js ejecutando el siguiente comando en la terminal:

para iniciar el app.js tenemos que usar el comando "node app.js"

El servidor se iniciará y se imprimirá un mensaje en la terminal indicando en qué puerto está escuchando, por ejemplo:
Servidor Node.js escuchando en el puerto 3000
Conexión exitosa con la base de datos SQLite

Ahora puedes realizar solicitudes HTTP al servidor utilizando herramientas como Postman, cURL o incluso un navegador web. A continuación se detallan las operaciones que puedes realizar:

a. Obtener todos los usuarios:
Realiza una solicitud GET a la siguiente URL:
http://localhost:3000/usuarios

b. Obtener un usuario por su ID:
Realiza una solicitud GET a la siguiente URL, reemplazando :id con el ID real del usuario:
http://localhost:3000/usuarios/:id

c. eliminar usuario" curl -X DELETE http://localhost:3000/usuarios/{id}"

d. ver lista de usuarios "curl http://localhost:3000/usuarios"

e. agregar un usuario:
curl -X POST -H "Content-Type: application/json" -d '{"nombre": "", "correo": ""}' http://localhost:3000/usuarios
