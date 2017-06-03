#The dockerfile for Wikilogic's nginx static file server

# Pull base image - we're running it on Ubuntu!
FROM ubuntu

# Install Nginx
RUN apt-get update
RUN apt-get install -y nginx
RUN rm -rf /var/lib/apt/lists/*
RUN chown -R www-data:www-data /var/lib/nginx

#copy the server configuration into the docker container
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./dist /var/www/app
COPY ./.htpasswd /etc/nginx/.htpasswd

# Define mountable directories.
VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf.d", "/var/log/nginx", "/var/www/app"]

# Define default command.
CMD ["nginx"]

# Expose ports.
EXPOSE 80