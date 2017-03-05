#Base this image from the official Mongo version
FROM mongo

RUN mkdir -p /data/scripts

COPY . /data/scripts

RUN /data/scripts/mongo_init.sh
