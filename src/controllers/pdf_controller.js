let db = require('../libs/db');
const mysql = require('mysql');
let CONSTANTS = require("../libs/constants");
let nodemailer = require('nodemailer');
let LOGIN = require("../login");
const pool = mysql.createPool({
	connectionLimit: 10,
	host: CONSTANTS.SETTINGS.DB.HOST,
	user: CONSTANTS.SETTINGS.DB.USERNAME,
	password: CONSTANTS.SETTINGS.DB.PASSWORD,
	database: CONSTANTS.SETTINGS.DBNAME.NAME
})
module.exports = function (models) {
	let page = {};
	this.main = function (req, res, next) {
		res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
		res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
		res.setHeader("Expires", "0"); // Proxies.

		/* USER start */
		let obj_user = {};
		let adminlog;
		req.rawHeaders.forEach(function (val, i) {
			if (i % 2 === 1) return;
			obj_user[val] = req.rawHeaders[i + 1];
		});
		JSON.stringify(obj_user);
		adminlog = LOGIN.admins.includes("alesya.heymann@fhnw.ch")

		/* USER end */

		let tsID = parseInt(req.query.tsid);
		let status = parseInt(req.query.status);
		let title;
		let lastname;
		let email;
		let orderid;
		let reqBody = req.body;
		let topic;
		let statuschange;
		let mailtext;
		let datetime;
		let mailtype;
		let orderstatus;
		let statuscurrent;

		page.title = "Ethra - Antrag auf Genehmigung eines Forschungsvorhabens\n" +
			"Pädagogische Hochschule FHNW";
		if (CONSTANTS.SETTINGS.WEB.SUB_PATH)
			page.path = "/" + CONSTANTS.SETTINGS.WEB.PATH_STRING;
		else
			page.path = "";
		pool.getConnection((err, connection) => {
			if (err) throw err
			let softwareListDetails = [];
			sql1 = 'SELECT * FROM applications WHERE ("alesya.heymann@fhnw.ch" IN (SELECT email FROM users) AND applicationid IN (SELECT ' + tsID + ' FROM applications))';
			connection.query("" + sql1 + "", (err, rows) => {
				connection.release() // return the connection to pool
				if (!err) {
					for (let i = 0; i < rows.length; i++) {
						// Create an object to save current row's data
						let order = {
							'applicationid': rows[i].applicationid,
							'application': (rows[i].application === "undefined" ? " " : rows[i].application),
							'approvednr': (rows[i].approvednr === "undefined" ? " " : rows[i].approvednr),
							'title': (rows[i].title === "undefined" ? " " : rows[i].title),
							'firstname': (rows[i].firstname === "undefined" ? " " : rows[i].firstname),
							'lastname': (rows[i].lastname === "undefined" ? " " : rows[i].lastname),
							'email': (rows[i].email === "undefined" ? " " : rows[i].email),
							'institute': (rows[i].institute === "undefined" ? " " : rows[i].institute),
							'finance': (rows[i].finance === "undefined" ? " " : rows[i].finance),
							'subdiscipline': (rows[i].subdiscipline === "undefined" ? " " : rows[i].subdiscipline),
							'topic': (rows[i].topic === "undefined" ? " " : rows[i].topic),
							'projectduration': (rows[i].projectduration === "undefined" ? " " : rows[i].projectduration),
							'summ': (rows[i].summ === "undefined" ? " " : rows[i].summ),
							'appraisal': (rows[i].appraisal === "undefined" ? " " : rows[i].appraisal),
							'registration': (rows[i].registration === "undefined" ? " " : rows[i].registration),
							'registrationtext': (rows[i].registrationtext === "undefined" ? " " : rows[i].registrationtext),
							'participants': (rows[i].participants === "undefined" ? " " : rows[i].participants),
							'personaldata': (rows[i].personaldata === "undefined" ? " " : rows[i].personaldata),
							'recruited': (rows[i].recruited === "undefined" ? " " : rows[i].recruited),
							'informedbefore': (rows[i].informedbefore === "undefined" ? " " : rows[i].informedbefore),
							'execution': (rows[i].execution === "undefined" ? " " : rows[i].execution),
							'instructions': (rows[i].instructions === "undefined" ? " " : rows[i].instructions),
							'informedafter': (rows[i].informedafter === "undefined" ? " " : rows[i].informedafter),
							'compensation': (rows[i].compensation === "undefined" ? " " : rows[i].compensation),
							'compensationtext': (rows[i].compensationtext === "undefined" ? " " : rows[i].compensationtext),
							'performanced': (rows[i].performanced === "undefined" ? " " : rows[i].performanced),
							'voluntary': (rows[i].voluntary === "undefined" ? "" : rows[i].voluntary),
							'voluntaryfile': (rows[i].voluntaryfile === "undefined" ? " " : rows[i].voluntaryfile),
							'notparticipate': (rows[i].notparticipate === "undefined" ? " " : rows[i].notparticipate),
							'notparticipatetext': (rows[i].notparticipatetext === "undefined" ? " " : rows[i].notparticipatetext),
							'withdraw': (rows[i].withdraw === "undefined" ? " " : rows[i].withdraw),
							'agreement': (rows[i].agreement === "undefined" ? " " : rows[i].agreement),
							'agreementfile': (rows[i].agreementfile === "undefined" ? " " : rows[i].agreementfile),
							'participationundersixteen': (rows[i].participationundersixteen === "undefined" ? " " : rows[i].participationundersixteen),
							'participationundersixteentext': (rows[i].participationundersixteentext === "undefined" ? " " : rows[i].participationundersixteentext),
							'risk': (rows[i].risk === "undefined" ? " " : rows[i].risk),
							'risktext': (rows[i].risktext === "undefined" ? " " : rows[i].risktext),
							'riskfile': (rows[i].riskfile === "undefined" ? " " : rows[i].riskfile),
							'integrity': (rows[i].integrity === "undefined" ? " " : rows[i].integrity),
							'integritytext': (rows[i].integritytext === "undefined" ? " " : rows[i].integritytext),
							'mentalintegrity': (rows[i].mentalintegrity === "undefined" ? " " : rows[i].mentalintegrity),
							'mentalintegritytext': (rows[i].mentalintegritytext === "undefined" ? " " : rows[i].mentalintegritytext),
							'socialintegrity': (rows[i].socialintegrity === "undefined" ? " " : rows[i].socialintegrity),
							'socialintegritytext': (rows[i].socialintegritytext === "undefined" ? " " : rows[i].socialintegritytext),
							'charges': (rows[i].charges === "undefined" ? " " : rows[i].charges),
							'reason': (rows[i].reason === "undefined" ? " " : rows[i].reason),
							'experience': (rows[i].experience === "undefined" ? " " : rows[i].experience),
							'experiencetext': (rows[i].experiencetext === "undefined" ? " " : rows[i].experiencetext),
							'illusion': (rows[i].illusion === "undefined" ? " " : rows[i].illusion),
							'illusiontext': (rows[i].illusiontext === "undefined" ? " " : rows[i].illusiontext),
							'observation': (rows[i].observation === "undefined" ? " " : rows[i].observation),
							'media': (rows[i].media === "undefined" ? " " : rows[i].media),
							'anonymized': (rows[i].anonymized === "undefined" ? " " : rows[i].anonymized),
							'confidentiality': (rows[i].confidentiality === "undefined" ? " " : rows[i].confidentiality),
							'destroy': (rows[i].destroy === "undefined" ? " " : rows[i].destroy),
							'deleted': (rows[i].deleted === "undefined" ? " " : rows[i].deleted),
							'repo': (rows[i].repo === "undefined" ? " " : rows[i].repo),
							'located': (rows[i].located === "undefined" ? " " : rows[i].located),
							'signature': (rows[i].signature === "undefined" ? " " : rows[i].signature),
							'dateapp': (rows[i].dateapp === "undefined" ? " " : rows[i].dateapp),
							'deadline': (rows[i].deadline === "undefined" ? " " : rows[i].deadline),
							'comments': (rows[i].comments === "undefined" ? " " : rows[i].comments),
							'orderstatus': (rows[i].orderstatus === "undefined" ? " " : rows[i].orderstatus),
							'status': rows[i].status,
							'proc': rows[i].proc
						}
						// Add object into array
						title = rows[i].title;
						lastname = rows[i].lastname;
						email = rows[i].email;
						orderid = rows[i].orderid;
						topic = rows[i].topic;
						softwareListDetails.push(order);
					}
				} else {
					console.log(err)
				}
			})

			setTimeout(
				function () {
					res.render('layout_pdf', {
						"softwareListDetails": softwareListDetails,
						"statuscurrent": statuscurrent,
						"vornamelog": decodeURIComponent("Peter"),
						"nachnamelog": decodeURIComponent("Muster"),
						"admin": adminlog
					});
				}, 500);

		})

	};
};
