# We need node to build the app on the docker container.
# NAME THE GOD DAMN THING SO THAT WE CAN USE IT IN STAGE 2
FROM node:alpine as build

RUN apk add --update nodejs npm
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install react-scripts -g

COPY . /app
RUN npm run build
FROM nginx:alpine



# Then we copy from build, the whole React application
RUN mkdir /var/ffxivprofit
COPY --from=build /app/build /var/ffxivprofit
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 9000
CMD ["nginx", "-g", "daemon off;"]


