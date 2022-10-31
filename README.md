# Authentication

Authentication from scratch

## Authentication vs Authorization

**Authentication** is the process of who a particular user is.
We typically authenticate with a username/password combo, but we can also use security questions, facial recognition, etc.

**Authorizattion** is verifying what a specific user has access to.
Generally, we autherize after a user has been authenticated.

> "Now that we know who you are, here is what you are allowed to do and NOT to do"

##### Never store passwords in text

```
{
    username:'admin',
    password:'password' <- NO !
}
```

That is why we use hashing functions

**Hashing Functions** are function that map input data of some arbitrary size to fixed-size output values. So we don't store the actual password but a hashed veersion of it.

## Cryptographic hash functions

1.One-way function which is is infeasible to invert.
2.Small change in input yields large change in the output
3.Deterministic- same input yields same output
4.Unlikely to find 2 outputs with same value
5.Password Hash Functions are deliberately SLOW
