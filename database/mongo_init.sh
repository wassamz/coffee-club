#!/usr/bin/env bash

mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db/

mongo mydb /data/scripts/init_scripts/create-users.js

# mongo mydb scripts/create-collections.js

mongod --shutdown