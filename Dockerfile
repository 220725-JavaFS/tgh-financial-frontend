FROM httpd:2.4
WORKDIR /dist/banking-frontend-angular/
COPY . /usr/loca/apache2/htdocs/

