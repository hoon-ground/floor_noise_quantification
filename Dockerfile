FROM node:20-alpine3.18

RUN mkdir /noise-stop-web
WORKDIR /noise-stop-web
COPY . /noise-stop-web
ENV PATH /noise-stop-web/node_modules/.bin:$PATH

RUN npm install --silent

USER root
RUN npm install -g serve --save
RUN npm run build
CMD ["npm", "run", "deploy"]
