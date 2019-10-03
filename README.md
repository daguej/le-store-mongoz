le-store-mongoz
===============

[![CircleCI](https://circleci.com/gh/daguej/le-store-mongoz.svg?style=svg)](https://circleci.com/gh/daguej/le-store-mongoz)

This module implements a dead-simple, zero-dependency mongodb store for [greenlock](https://www.npmjs.com/package/greenlock).  This allows you to persist your [Let's Encrypt](https://letsencrypt.org/) data in mongo for automated TLS certificate issuance and use.

le-store-mongoz does not handle database connections itself; you must pass in `Collection` objects you [acquire](https://mongodb.github.io/node-mongodb-native/3.3/api/Db.html#collection) from the mongodb driver.

Example
-------

    // once you've connected to mongodb and have a `Db` from `MongoClient`
    
    Greenlock.create({
        …
        store: require('le-store-mongoz').create(
            db.collection('le-accounts'),
            db.collection('le-certs')
        )
    });


API
---

### `create(accountCollection, certCollection)`

Creates a greenlock [store](https://www.npmjs.com/package/greenlock#store-implementation).

- `accountCollection` - a mongodb [`Collection`](https://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html) where your Let's Encrypt credentials will be stored.
- `certCollection` - a mongodb [`Collection`](https://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html) where your Let's Encrypt certificates and keys will be stored.

Why?
----
There are other le-store-mongo* packages available; why another?

As of late 2019, other modules implementing a greenlock mongodb store brought in as many as *hundreds* of dependencies and/or were totally undocumented.  As both of these properties are distasteful, I was compelled to create another.