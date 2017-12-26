FROM node:7

# install necessary linux packages and node environment
RUN npm install -g gulp gulp-cli bower && \
echo '{ "allow_root": true }' > /root/.bowerrc

RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app


ENTRYPOINT npm run start.deving

