FROM node:20-alpine

# container dir
WORKDIR /app

COPY package*.json ./

RUN npm install

# copy restante code
COPY . .

# EXPORT PORTA DO BACKEND
EXPOSE 8000

# comando de start

CMD [ "node", "index.js" ]