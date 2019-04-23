# DEV Stack
Docker-compose stack of all essential blockr modules

## Info
Models can be found at https://github.com/ruudschouten/blockr-sc-models

## Steps run blockchain for the first time
 - Clone project
 - Run `docker-compose up --build`
 - Run `docker-compose exec validator_backup sh`
 - Run `cat /keys/.keys`
 - Copy `pubKey` and `privKey` to `PUBKEY_ADMIN` and `PRIVKEY_ADMIN` in `blockr-validator/src/.env`
 - Run `docker-compose down`
 - Run `docker-compose up --build`

# Steps run blockchain
  - Run `docker-compose up --build`
