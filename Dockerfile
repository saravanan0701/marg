FROM node
WORKDIR /app
COPY . /app
ARG env="local"
ARG port

EXPOSE 3000
#ENV NODE_ENV development

RUN cp "env/"$env".env" ".env"

CMD [ "sh", "dev.sh"]
