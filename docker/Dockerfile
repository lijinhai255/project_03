# 小体积的 node 镜像
FROM mhart/alpine-node

LABEL maintainer = "mengsixing <yinhengliben@gmail.com>"

RUN rm -rf /app
RUN mkdir /app

WORKDIR /app

COPY . .

# RUN npm install
# RUN npm run build
RUN mv /app/dist ./

EXPOSE 8082

CMD BUILD_ENV=docker node app.js
