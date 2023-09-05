# Usar a imagem node:16.14-alpine como base
 FROM node:16.14-alpine

 # Definir o diretório de trabalho
 WORKDIR /app-frontend

 # Copiar os arquivos de dependências para o container
 COPY package*.json ./

 # Instalar as dependências Node
 RUN npm install

 # Copiar o restante dos arquivos da aplicação para o container
 COPY . .

 # Sinalize que a aplicação expõe a porta 3000
 EXPOSE 3000

 # Comando para iniciar a aplicação
 CMD ["npm", "start"] 