#The dockerfile for Wikilogic's nginx static file server

# Pull base image - we're running it on Ubuntu!
FROM ubuntu:16.04

# Install Nginx
RUN apt-get update
RUN apt-get install -y nginx
RUN rm -rf /var/lib/apt/lists/*
RUN chown -R www-data:www-data /var/lib/nginx

#copy the server configuration into the docker container
COPY ./nginx.https.conf /etc/nginx/nginx.conf
COPY ./.htpasswd /etc/nginx/.htpasswd
COPY /etc/letsencrypt/ /root/ssl/

# sharing the static files! "/root/ssl"
VOLUME ["/var/www/app"] 

# Define default command.
CMD ["nginx"]

# Expose ports.
EXPOSE 80
EXPOSE 443