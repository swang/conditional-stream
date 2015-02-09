conditional-stream
=========================================
conditional-stream is a duplex stream that only passes data when a set function returns true

[![build status](https://secure.travis-ci.org/swang/conditional-stream.png)](http://travis-ci.org/swang/conditional-stream)

## requirements

- [node v0.10+](http://nodejs.org/) (this uses streams2)

## install

- npm install conditional-stream

## example
to filter/limit a stream to only numbers

**onlyNumbers.js**
```js
var CondStream = require('conditional-stream')
  , cond = new CondStream(function(input) {
  return (!isNaN(Number(input.toString())))
})

process.stdin.pipe(cond).pipe(process.stdout)
```
**console**
```shell
> echo 2 | node onlyNumbers.js
2

> echo a | node onlyNumbers.js
>
```

## license
MIT
