let db = require('../libs/db');
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
    this.main = function (req, res, next) {
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
        page.title = "Ethra - Antrag auf Genehmigung eines Forschungsvorhabens\n" +
            "Pädagogische Hochschule FHNW";
        pool.getConnection((err, connection) => {
            let tsID = parseInt(req.query.tsid);
            let softwareListDetails = [];
            console.log(req.body);
            connection.query('SELECT * FROM applications WHERE ("alesya.heymann@fhnw.ch" IN (SELECT email FROM users) AND applicationid IN (SELECT '+tsID+' FROM applications))', (err, rows) => {
                connection.release() // return the connection to pool
                if (!err) {
                    for (let i = 0; i < rows.length; i++) {
                        // Create an object to save current row's data
                        let order = {
                            'applicationid': rows[i].applicationid,
                            'orderidmail': rows[i].applicationid,
                            'application': rows[i].application,
                            'approvednr': (rows[i].approvednr === "undefined" ? " " : rows[i].approvednr),
                            'title': rows[i].title,
                            'firstname': rows[i].firstname,
                            'lastname': rows[i].lastname,
                            'email': rows[i].email,
                            'institute': rows[i].institute,
                            'finance': rows[i].finance,
                            'subdiscipline': rows[i].subdiscipline,
                            'topic': rows[i].topic,
                            'projectduration': rows[i].projectduration,
                            'summ': rows[i].summ,
                            'appraisal': rows[i].appraisal,
                            'registration': rows[i].registration,
                            'registrationtext': rows[i].registrationtext,
                            'participants': rows[i].participants,
                            'personaldata': rows[i].personaldata,
                            'recruited': rows[i].recruited,
                            'informedbefore': rows[i].informedbefore,
                            'execution': rows[i].execution,
                            'instructions': rows[i].instructions,
                            'informedafter': rows[i].informedafter,
                            'compensation': rows[i].compensation,
                            'compensationtext': rows[i].compensationtext,
                            'performanced': rows[i].performanced,
                            'voluntary': rows[i].voluntary,
                            'voluntaryfile': rows[i].voluntaryfile,
                            'notparticipate': rows[i].notparticipate,
                            'notparticipatetext': rows[i].notparticipatetext,
                            'withdraw': rows[i].withdraw,
                            'agreement': rows[i].agreement,
                            'agreementfile': rows[i].agreementfile,
                            'participationundersixteen': rows[i].participationundersixteen,
                            'participationundersixteentext': rows[i].participationundersixteentext,
                            'risk': rows[i].risk,
                            'risktext': rows[i].risktext,
                            'riskfile': rows[i].riskfile,
                            'integrity': rows[i].integrity,
                            'integritytext': rows[i].integritytext,
                            'mentalintegrity': rows[i].mentalintegrity,
                            'mentalintegritytext': rows[i].mentalintegritytext,
                            'socialintegrity': rows[i].socialintegrity,
                            'socialintegritytext': rows[i].socialintegritytext,
                            'charges': rows[i].charges,
                            'reason': rows[i].reason,
                            'experience': rows[i].experience,
                            'experiencetext': rows[i].experiencetext,
                            'illusion': rows[i].illusion,
                            'illusiontext': rows[i].illusiontext,
                            'observation': rows[i].observation,
                            'media': rows[i].media,
                            'anonymized': rows[i].anonymized,
                            'anonymizedtext': rows[i].anonymizedtext,
                            'confidentiality': rows[i].confidentiality,
                            'confidentialitytext': rows[i].confidentialitytext,
                            'destroy': rows[i].destroy,
                            'deleted': rows[i].deleted,
                            'deletedtext': rows[i].deletedtext,
                            'repo': rows[i].repo,
                            'located': rows[i].located,
                            'signature': rows[i].signature,
                            'dateapp': rows[i].dateapp,
                            'deadline': (rows[i].deadline === "undefined" ? " " : rows[i].deadline),
                            'comments': rows[i].comments,
                            'commentex1': rows[i].commentex1,
                            'commentex2': rows[i].commentex2,
                            'status':rows[i].status,
                            'proc':rows[i].proc,
                            'ex1':rows[i].ex1,
                            'ex2':rows[i].ex2
                        }
                        // Add object into array
                        softwareListDetails.push(order);
                    } }
                else {
                    console.log(err)
                }
            })
            setTimeout(
                function(){
                    res.render('layout_form-filled', {
                        "vornamelog": decodeURIComponent("Peter"),
                        "nachnamelog": decodeURIComponent("Muster"),
                        "emaillog": "alesya.heymann@fhnw.ch",
                        "admin": adminlog,
                        "softwareListDetails": softwareListDetails
                    });
                }, 500);
        })
    };
};
