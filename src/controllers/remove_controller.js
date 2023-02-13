const mysql = require('mysql');
let CONSTANTS = require("../libs/constants");
const LOGIN = require("../login");
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : CONSTANTS.SETTINGS.DB.HOST,
    user            : CONSTANTS.SETTINGS.DB.USERNAME,
    password        : CONSTANTS.SETTINGS.DB.PASSWORD,
    database        : CONSTANTS.SETTINGS.DBNAME.NAME
})
module.exports = function (models) {
    let page = {};
    let CONSTANTS = require("../libs/constants");
    this.main = function (req, res) {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        /* USER start */
        let obj_user = {};
        let adminlog;
        req.rawHeaders.forEach(function(val, i) {
            if (i % 2 === 1) return;
            obj_user[val] = req.rawHeaders[i + 1];
        });
        JSON.stringify(obj_user);
        adminlog=LOGIN.admins.includes("alesya.heymann@fhnw.ch")
        /* USER end */
        let tsID = req.body;
        let ts = parseInt(tsID.str);
        page.title = "Ethra - Antrag auf Genehmigung eines Forschungsvorhabens\n" +
            "Pädagogische Hochschule FHNW";
        if(CONSTANTS.SETTINGS.WEB.SUB_PATH)
            page.path = "/"+CONSTANTS.SETTINGS.WEB.PATH_STRING;
        else
            page.path = "";

        pool.getConnection((err, connection) => {
            if (err) throw err
            sql4 = 'DELETE FROM applications WHERE applicationid IN (SELECT '+ts+' FROM applications)';
            sql5 = 'DELETE FROM history WHERE applicationid IN (SELECT '+ts+' FROM history)';
            sqlIdupdate = "ALTER TABLE applications AUTO_INCREMENT = 1";
            connection.query(""+sql4+"",
                (err, rows) => {
                    connection.query(""+sql5+"",
                        (err, rows) => {
                            connection.query(""+sqlIdupdate+"",
                                (err, rows) => {
                                })
                        })
                    connection.release();
                })
            setTimeout(
                function () {
                    res.render('layout_user');
                }, 500);
        })
    };
};

