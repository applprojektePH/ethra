 let q     = require('q');
// let OrientJs = require('orientjs');
//
 let CONSTANTS = require("../libs/constants");
 let UTILS = require("../libs/utils");
 const mysql = require('mysql');
 const pool  = mysql.createPool({
     connectionLimit : 10,
     host            : 'localhost',
     user            : 'ethra',
     password        : 'mysecretpassword',
     database        : 'ethra'
 })
