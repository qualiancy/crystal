/*!
 * Crystal - Unique ID Generator
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * Primary Export
 */

module.exports = Crystal

/**
 * ## Usage
 *
 * Create an object to generate random ids and
 * store them in memory to avoid collision.
 *
 * ```js
 * var crystal = require('crystal')(opts);
 * ```
 *
 * ##### Options
 * - `base` _{Number}_ base number format. Default `16`.
 * - `bits` _{Number}_ bit length of key. Default `128`.
 * - `grow` _{Number}_ increase `bits` by `grow` when heavy collision occurs. Default `32`.
 *
 * @param {Object} options
 * @api public
 */

function Crystal (opts) {
  if (!(this instanceof Crystal)) return new Crystal(opts);
  opts = opts || {};
  this._base = opts.base || 16;
  this._bits = opts.bits || 128;
  this._grow = opts.grow || 32;
  this._store = [];
}

/**
 * ### .claim ([id])
 *
 * Add an `id` to the internal storage or generate
 * a new random id and add to the internal storage.
 * If `id` is specified and it already exists an
 * `Error` will be thrown.
 *
 * ```js
 * var id = crystal.claim();
 * ```
 *
 * @param {String} (optional) id to claim
 * @return {String} id added to storage
 * @throws {Error} on error
 * @api public
 */

Crystal.prototype.claim = function (id) {
  id = id + '' || null;

  if (arguments.length === 1) {
    if (this.has(id)) throw new Error('ID already claimed: ' + id);
  } else {
    id = generate.call(this);
  }

  this._store.push(id);
  return id;
};

/**
 * ### .release (id)
 *
 * Remove an id from the internal storage thus
 * allowing it to be used re-claimed at a later
 * time.
 *
 * ```js
 * crystal.release(id);
 * ```
 *
 * @param {String} id to release
 * @return {Boolean} release succussful
 * @api public
 */

Crystal.prototype.release = function (id) {
  var store = this._store
    , pos = store.indexOf(id);
  if (pos > -1) store.splice(pos, 1);
  return true;
};

/**
 * ### .has (id)
 *
 * Determine if a a given `id` has already
 * been claimed.
 *
 * @param {String} id
 * @return {Boolean} in storage
 * @api public
 */

Crystal.prototype.has = function (id) {
  return !!~this._store.indexOf(id);
};

/**
 * ### .random ()
 *
 * Generate a single random `id` but do not
 * add it to the storage for collision detection.
 *
 * ```js
 * var id1 = crystal.random()
 *   , id2 = crystal.random();
 * ```
 *
 * @returns {String} id
 * @api public
 */

// inspiration: substack/node-hat
// https://github.com/substack/node-hat
Crystal.prototype.random = function () {
  var base = this._base
    , bits = this._bits
    , digits = Math.log(Math.pow(2, bits)) / Math.log(base)
    , i = 2
    , y;

  for (; digits === Infinity; i *=2) {
    y = Math.pow(2, bits / i);
    digits = Math.log(y) / Math.log(base) * i;
  }

  var rem = digits - Math.floor(digits)
    , res = ''
    , ii = 0
    , b, x;

  for (; ii < Math.floor(digits); ii++) {
    x = random(base, base);
    res = x + res;
  }

  if (rem) {
    b = Math.pow(base, rem);
    x = random(b, base);
    res = x + res;
  }

  var parsed = parseInt(res, base);
  return parsed !== Infinity && parsed >= Math.pow(2, bits)
    ? this.random()
    : res;
};

/*!
 * Generate a random string of a given length and
 * convert it to a string of type `base`.
 *
 * @param {Number} length of random
 * @param {Number} base data type
 * @return {String} random string
 * @api private
 */

function random (star, base) {
  return Math.floor(Math.random() * star).toString(base);
}

/*!
 * Generate a random `id` that does not exist in
 * contexts data storage. Will increase `bits` if
 * a collision occurs more than 10 times in a row.
 *
 * @return {String} unique id
 * @api private
 */

function generate () {
  var grow = this._grow
    , i = 0
    , id = null;

  do {
    if (i++ > 10) this._bits += grow;
    id = this.random();
  } while (this.has(id));

  return id;
}
