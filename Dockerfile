# Pull base image.
FROM nginx

# Add the files to serve
WORKDIR /var/www
ADD ./dist /var/www

#copy the server configuration into the docker container
COPY nginx.conf /etc/nginx/nginx.conf