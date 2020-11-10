FROM ubuntu:18.04

RUN apt-get update && apt-get install -y curl gnupg2 nodejs npm openjdk-11-jdk-headless python

# Ubuntu 標準の npm だと古すぎるため対応
RUN npm install n -g && n stable
RUN npm -v

RUN mkdir /src
WORKDIR /src

CMD ["bash", "-c", "npm i && npm run compile"]
