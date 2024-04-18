'use strict'

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Origin
  |--------------------------------------------------------------------------
  |
  | Set the list of origins to be allowed. The value can be one of the following
  |
  | Boolean: true - Allow current request origin
  | Boolean: false - Disallow all
  | String[] - An array of allowed origins
  | String - A single allowed origin
  | RegExp - A regular expression pattern allowed origins
  | Function - Receives the origin as the first parameter and should return the origin
  |            to be allowed ('*' disallows all origins)
  |
  */
  origin: true,

  /*
  |--------------------------------------------------------------------------
  | Methods
  |--------------------------------------------------------------------------
  |
  | Set the list of methods to be allowed. The value can be one of the following
  |
  | String[] - An array of allowed methods
  |
  */
  methods: ['GET', 'PUT', 'POST', 'DELETE'],

  /*
  |--------------------------------------------------------------------------
  | Headers
  |--------------------------------------------------------------------------
  |
  | Configure which headers are allowed in the request.
  |
  */
  headers: true,

  /*
  |--------------------------------------------------------------------------
  | Expose Headers
  |--------------------------------------------------------------------------
  |
  | Set which headers are to be exposed in the response.
  |
  */
  exposeHeaders: [],

  /*
  |--------------------------------------------------------------------------
  | Credentials
  |--------------------------------------------------------------------------
  |
  | Define Access-Control-Allow-Credentials header. It should always be a
  | boolean.
  |
  */
  credentials: true,

  /*
  |--------------------------------------------------------------------------
  | MaxAge
  |--------------------------------------------------------------------------
  |
  | Define Access-Control-Allow-Max-Age
  |
  */
  maxAge: 90,
};
