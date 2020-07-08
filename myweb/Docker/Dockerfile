FROM nginx:stable

COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY conf/site.conf /etc/nginx/conf.d/default.conf
COPY content /usr/share/nginx/html

RUN touch /var/run/nginx.pid && \
  chown -R www-data:www-data /var/run/nginx.pid && \
  chown -R www-data:www-data /var/cache/nginx

USER www-data
