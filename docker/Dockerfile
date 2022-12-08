FROM node:18-alpine
WORKDIR /app
COPY . .
# RUN yarn install --production
# RUN npm install --production
RUN npm start
CMD ["node", "src/index.js"]
EXPOSE 3000