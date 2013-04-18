# crystal [![Build Status](https://travis-ci.org/qualiancy/crystal.png?branch=master)](https://travis-ci.org/qualiancy/crystal)

> Tiny math-based unique id generator.

## Installation

### Node.js

`crystal` is available on [npm](http://npmjs.org).

    $ npm install crystal

### Component

`crystal` is available as a [component](https://github.com/component/component).

    $ component install qualiancy/crystal

## Usage

* **@param** _{Object}_ options 

Create an object to generate random ids and
store them in memory to avoid collision.

```js
var crystal = require('crystal')(opts);
```

##### Options

- `base` _{Number}_ base number format. Default `16`.
- `bits` _{Number}_ bit length of key. Default `128`.
- `grow` _{Number}_ increase `bits` by `grow` when heavy collision occurs. Default `32`.


### .claim ([id])

* **@param** _{String}_ (optional) id to claim
* **@return** _{String}_  id added to storage

Add an `id` to the internal storage or generate
a new random id and add to the internal storage.
If `id` is specified and it already exists an
`Error` will be thrown.

```js
var id = crystal.claim();
```


### .release (id)

* **@param** _{String}_ id to release
* **@return** _{Boolean}_  release succussful

Remove an id from the internal storage thus
allowing it to be used re-claimed at a later
time.

```js
crystal.release(id);
```


### .has (id)

* **@param** _{String}_ id 
* **@return** _{Boolean}_  in storage

Determine if a a given `id` has already
been claimed.


### .random ()

* **@return** _{String}_  id

Generate a single random `id` but do not
add it to the storage for collision detection.

```js
var id1 = crystal.random()
  , id2 = crystal.random();
```


## License

(The MIT License)

Copyright (c) 2012 Jake Luer <jake@qualiancy.com> (http://qualiancy.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
