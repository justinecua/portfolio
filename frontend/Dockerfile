#---------------- Development ----------------------
# FROM node:22.16.0-slim
# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN npm install

# COPY . .
# EXPOSE 5175
# CMD ["npm", "run", "dev"]

# ------------- Production ------------------------
FROM node:22.16.0
WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm install
COPY . /usr/src/app
RUN npm run build
EXPOSE 5175
CMD ["npm", "run", "preview"]