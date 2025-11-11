FROM node as base

RUN apt-get update && \
  apt-get install --no-install-recommends -y \
  build-essential \
  python3 && \
  rm -fr /var/lib/apt/lists/* && \
  rm -rf /etc/apt/sources.list.d/*

RUN npm install --global truffle ganache

FROM base as truffle

RUN mkdir -p /home/app
WORKDIR /home/app

COPY . /home/app

COPY package.json /home/app
COPY package-lock.json /home/app

RUN npm install

COPY truffle-config.js /home/app
COPY contracts /home/app/contracts
COPY migrations /home/app/migrations/
COPY test /home/app/test/

CMD ["truffle", "migrate"]

FROM base as ganache

RUN mkdir -p /home
WORKDIR /home
EXPOSE 8545

ENTRYPOINT ["ganache"]
