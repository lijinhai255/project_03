# 小体积的 node 镜像
FROM mhart/alpine-node

LABEL maintainer = "mengsixing <yinhengliben@gmail.com>"

RUN rm -rf /app
RUN mkdir /app

WORKDIR /app
RUN pwd 
COPY . /app

# RUN npm install
# RUN npm run build
RUN pwd 
RUN mv ./dist/* ./

EXPOSE 8082

CMD BUILD_ENV=docker node app.js
