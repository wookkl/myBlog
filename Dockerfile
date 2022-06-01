FROM ubuntu:20.04

MAINTAINER wookkl

WORKDIR /app

RUN cd /etc/apt && \
    sed -i 's/deb.debian.org/ftp.daum.net/g' sources.list

RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get install -y supervisor && \
    rm -rf /var/lib/apt/lists/* && \
    echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
    rm /etc/nginx/sites-enabled/default && \
    chown -R www-data:www-data /var/lib/nginx

RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs && \
    apt-get install -y build-essential

COPY . /app/

RUN chown -R www-data:www-data /app && \
    ln -s /app/nginx.conf /etc/nginx/sites-enabled/ && \
    ln -s /app/supervisor.conf /etc/supervisor/conf.d/

RUN npm install -g npm && \
    npm install --omit=dev --omit=optional && \
    npm install pm2 --location=global

EXPOSE 80

CMD supervisord -n
