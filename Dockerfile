FROM wookkl/node16-nginx-supervisor

MAINTAINER wookkl

COPY . /app/

WORKDIR /app

RUN chown -R www-data:www-data /app && \
    ln -s /app/nginx.conf /etc/nginx/sites-enabled/ && \
    ln -s /app/supervisor.conf /etc/supervisor/conf.d/

RUN npm install -g npm && \
    npm install --omit=dev --omit=optional && \
    npm install pm2 --location=global

EXPOSE 80

CMD supervisord -n
