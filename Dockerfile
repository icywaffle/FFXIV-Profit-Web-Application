# We need node to build the app on the docker container.
# NAME THE GOD DAMN THING SO THAT WE CAN USE IT IN STAGE 2
FROM node:alpine as build


# set working directory
WORKDIR /app
# Nginx is a smaller version of node.
FROM nginx:alpine



# Path to an X509 certificate file, if using SSL.
# http.sslcert = /etc/letsencrypt/live/ffxivprofit.com/cert.pem
# On windows, you would need to make a mock folder like this.
# these keys should be self signed keys, if on Development
# Path to an X509 certificate key, if using SSL.
# http.sslkey = /etc/letsencrypt/live/ffxivprofit.com/privkey.pem
COPY /etc/letsencrypt/live/ffxivprofit.com/cert.pem  /etc/ssl/certs/
COPY /etc/letsencrypt/live/ffxivprofit.com/privkey.pem /etc/ssl/private/

# Then we copy from build, the whole React application
RUN mkdir /var/ffxivprofit
COPY ./build /var/ffxivprofit
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]


