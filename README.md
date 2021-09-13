# pilgrin
Avaliação parte de processo seletivo


## Requirements

1. Node JS - 14.17+
1. Yarn

## Installation

```sh
    yarn install
```

## Running tests

The following script will run the tests written to validate the use cases. Note that it will erase the database.

```sh
    yarn test
```

## Populate DB

There's a script to populate the database:
```sh
    yarn populatedb
```
The configured DBSM is SQLite. It's file is under bin/database.sqlite

## Run web server

```sh
    yarn start
```
