# We need node to build the app on the docker container.
# NAME THE GOD DAMN THING SO THAT WE CAN USE IT IN STAGE 2
FROM node:alpine as build


# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install react-scripts@3.1.1 -g

COPY . /app
RUN npm run build

# Nginx is a smaller version of node.
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]


