FROM httpd:2.4
WORKDIR /dist/banking-frontend-angular
COPY . /usr/local/apache2/htdocs

