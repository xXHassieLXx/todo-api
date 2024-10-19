#Imagen base 
FROM node 

#Crear el directorio donde va a ir la aplicacion 
WORKDIR /app 

#Copiar el package.json 
COPY package*.json ./

#Instalar los node modules 
RUN npm install 

#Copiar archivos de mi local a mi contenedor 
COPY . .

#Compilar aplicacion
RUN npm run build

#Comando de inicio de contenedor }
CMD ["node","dist/index.js"]
