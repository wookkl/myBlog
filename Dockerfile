FROM ubuntu:20.04
FROM node:16.14

MAINTAINER wookkl

WORKDIR /app

RUN cd /etc/apt && \
  sed -i 's/deb.debian.org/ftp.daum.net/g' sources.list

RUN \
  apt-get update && \
  apt-get install -y nginx && \
  rm -rf /var/lib/apt/lists/* && \
  echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
  rm /etc/nginx/sites-enabled/default && \
  chown -R www-data:www-data /var/lib/nginx \

RUN apt-get install -y supervisor

COPY . /app/

RUN chown -R www-data:www-data /code && \
    ln -s /code/nginx.conf /etc/nginx/sites-enabled/ && \
    ln -s /code/supervisor.conf /etc/supervisor/conf.d/ && \

RUN npm install -g npm@8.10.0 typescript ts-node

EXPOSE 80

CMD supervisord -n
