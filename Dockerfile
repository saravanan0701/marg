FROM node
WORKDIR /app
COPY . /app

EXPOSE 3000
ENV NODE_ENV development

CMD [ "sh", "dev.sh" ]