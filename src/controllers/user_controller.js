let db = require('../libs/db');
var async = require('async');
const mysql = require('mysql');
let CONSTANTS = require("../libs/constants");
let nodemailer = require('nodemailer');
let LOGIN = require("../login");
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
        let url = req.url;
        page.title = "Ethra - Antrag auf Genehmigung eines Forschungsvorhabens\n" +
            "Pädagogische Hochschule FHNW";
        if(CONSTANTS.SETTINGS.WEB.SUB_PATH)
            page.path = "/"+CONSTANTS.SETTINGS.WEB.PATH_STRING;
        else
            page.path = "";
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
        pool.getConnection((err, connection) => {
            if (err) throw err
            console.log('connected as id ' + connection.threadId)
            let application = req.body.application;
            let approvednr = req.body.approvednr;
            let title = req.body.title;
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let email = req.body.email;
            let institute = req.body.institute;
            let finance = req.body.finance;
            let subdiscipline = req.body.subdiscipline;
            let projectduration = req.body.projectduration;
            let topic = req.body.topic;
            let summ = req.body.summ;
            let appraisal = req.body.appraisal;
            let registration = req.body.registration;
            let registrationtext = req.body.registrationtext;
            let participants = req.body.participants;
            let personaldata = req.body.personaldata;
            let recruited = req.body.recruited;
            let informedbefore = req.body.informedbefore;
            let execution = req.body.execution;
            let instructions = req.body.instructions;
            let informedafter = req.body.informedafter;
            let compensation = req.body.compensation;
            let compensationtext = req.body.compensationtext;
            let performanced = req.body.performanced;
            let voluntary = req.body.voluntary;
            let voluntaryfile = req.body.voluntaryfile;
            let notparticipate = req.body.notparticipate;
            let notparticipatetext = req.body.notparticipatetext;
            let withdraw = req.body.withdraw;
            let agreement = req.body.agreement;
            let agreementfile = req.body.agreementfile;
            let participationundersixteen = req.body.participationundersixteen;
            let participationundersixteentext = req.body.participationundersixteentext;
            let risk = req.body.risk;
            let risktext = req.body.risktext;
            let riskfile = req.body.riskfile;
            let integrity = req.body.integrity;
            let integritytext = req.body.integritytext;
            let mentalintegrity = req.body.mentalintegrity;
            let mentalintegritytext = req.body.mentalintegritytext;
            let socialintegrity = req.body.socialintegrity;
            let socialintegritytext = req.body.socialintegritytext;
            let charges = req.body.charges;
            let reason = req.body.reason;
            let experience = req.body.experience;
            let experiencetext = req.body.experiencetext;
            let illusion = req.body.illusion;
            let illusiontext = req.body.illusiontext;
            let observation = req.body.observation;
            let media = req.body.media;
            let anonymized = req.body.anonymized;
            let confidentiality = req.body.confidentiality;
            let destroy = req.body.destroy;
            let deleted = req.body.deleted;
            let repo = req.body.repo;
            let located = req.body.located;
            let dateapp = req.body.dateapp;
            let status = req.body.status;
            let orderstatus = 0;
            let softwareList = [];
            let orderidformail;
            let ordercurrent;
            let anredeMail;
            if (url=="/submit-form"){
                if (adminlog==true){
                    sql1 = 'SELECT * FROM applications WHERE (email = "alesya.heymann@fhnw.ch") OR (email <> "'+obj_user.mail+'" AND status <> 10) ORDER BY applicationid DESC';
                }
                else{
                    sql1 = 'SELECT * FROM applications WHERE (email = "alesya.heymann@fhnw.ch") ORDER BY applicationid DESC';
                }
                sql2 = 'INSERT INTO applications (application, approvednr, title, firstname, lastname, email, institute, finance, subdiscipline, projectduration, topic, summ, appraisal, registration, registrationtext, participants, personaldata, recruited, informedbefore, execution, instructions, informedafter, compensation, compensationtext, performanced, voluntary, voluntaryfile, notparticipate, notparticipatetext, withdraw, agreement, agreementfile, participationundersixteen, participationundersixteentext, risk, risktext, riskfile, integrity, integritytext, mentalintegrity, mentalintegritytext, socialintegrity, socialintegritytext, charges, reason, experience, experiencetext, illusion, illusiontext, observation, media, anonymized, confidentiality, destroy, deleted, repo, located, dateapp, deadline, comments, status, orderstatus) VALUES ( "'+application+'", "'+approvednr+'", "'+title+'", "'+firstname+'", "'+lastname+'", "'+email+'", "'+institute+'", "'+finance+'", "'+subdiscipline+'", "'+projectduration+'", "'+topic+'", "'+summ+'", "'+appraisal+'", "'+registration+'", "'+registrationtext+'", "'+participants+'", "'+personaldata+'", "'+recruited+'", "'+informedbefore+'", "'+execution+'", "'+instructions+'", "'+informedafter+'", "'+compensation+'", "'+compensationtext+'", "'+performanced+'", "'+voluntary+'", "'+voluntaryfile+'", "'+notparticipate+'", "'+notparticipatetext+'", "'+withdraw+'", "'+agreement+'", "'+agreementfile+'", "'+participationundersixteen+'", "'+participationundersixteentext+'", "'+risk+'", "'+risktext+'", "'+riskfile+'", "'+integrity+'", "'+integritytext+'", "'+mentalintegrity+'", "'+mentalintegritytext+'", "'+socialintegrity+'", "'+socialintegritytext+'", "'+charges+'", "'+reason+'", "'+experience+'", "'+experiencetext+'", "'+illusion+'", "'+illusiontext+'", "'+observation+'", "'+media+'", "'+anonymized+'", "'+confidentiality+'", "'+destroy+'", "'+deleted+'", "'+repo+'", "'+located+'", "'+dateapp+'", "", "", "'+status+'", "'+orderstatus+'")';
               connection.query(""+sql2+"",
                    (err, rows) => {
                        //  connection.release() // return the connection to pool
                        connection.query(""+sql1+"",
                            (err, rows) => {
                                connection.release() // return the connection to pool
                                if (!err) {
                                    for (let i = 0; i < rows.length; i++) {
                                        let statuscurrent;
                                        orderidformail = rows[0].applicationid;
                                        switch (rows[i].status) {
                                            case 10:
                                                statuscurrent = 'Entwurf';
                                                break;
                                            case 1:
                                                statuscurrent = 'Antrag in Bearbeitung';
                                                break;
                                            case 2:
                                                statuscurrent = 'Antrag in Prüfung';
                                                break;
                                            case 3:
                                                statuscurrent = 'Antrag bei Gremium';
                                                break;
                                            case 4:
                                                statuscurrent = 'Antrag Entscheid';
                                                break;
                                        }
                                        switch (rows[i].orderstatus) {
                                            case 1:
                                                statuscurrent = 'Antrag genehmigt';
                                                break;
                                            case 2:
                                                statuscurrent = 'Antrag abgelehnt';
                                                break;
                                            case 3:
                                                ordercurrent = 'Antrag zu Gremium';
                                                break;
                                            case 4:
                                                statuscurrent = 'Antrag vom Gremium genehmigt';
                                                break;
                                            case 5:
                                                statuscurrent = 'Antrag vom Gremium abgelehnt';
                                                break;
                                        }

                                        // Create an object to save current row's data
                                        let order = {
                                            'applicationid': rows[i].applicationid,
                                            'orderidmail': rows[i].applicationid,
                                            'application': rows[i].application,
                                            'approvednr': rows[i].approvednr,
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
                                            'confidentiality': rows[i].confidentiality,
                                            'destroy': rows[i].destroy,
                                            'deleted': rows[i].deleted,
                                            'repo': rows[i].repo,
                                            'located': rows[i].located,
                                            'dateapp': rows[i].dateapp,
                                            'deadline': "21.06.2023",
                                            'comments': rows[i].comments,
                                            'status': statuscurrent
                                        }
                                        // Add object into array
                                        softwareList.push(order);
                                    }
                                } else {
                                    console.log(err)
                                }
                                if (title == "Neutrale Anrede"){
                                    anredeMail = firstname +' '+lastname;
                                }
                                else{
                                    anredeMail = title +' '+lastname;
                                }
                                if (req.body.status!=='10'){
                                    let transport = nodemailer.createTransport({
                                        host: "lmailer.fhnw.ch",
                                        secure: false, // use SSL
                                        port: 25,
                                        tls: {
                                            rejectUnauthorized: false
                                        }
                                    });
                                    console.log('SMTP Configured');

                                    // Message object
                                    let messageSender = {

                                        // sender info
                                        from: 'Santra <alesya.heymann@fhnw.ch>',
                                        to: email,
                                        // Subject of the message
                                        subject: 'Ethra: Ethikantrag #'+orderidformail+'',

                                        // plaintext body
                                        text: 'Guten Tag '+anredeMail+', Ihr Antrag wurde von unserem System entgegengenommen und zur Bearbeitung an das entsprechende Team weitergeleitet. Eine Gesamtübersicht Ihrer Tickets erhalten Sie unter http://10.51.7.30/santra/details?tsid='+orderidformail+' nach der Anmeldung. \n' +
                                            '\n' +
                                            'Vielen Dank und freundliche Grüsse \n' +
                                            'Ihr ApplProjekte Supportteam \n' +
                                            'n|w\n',

                                        // HTML body
                                        html:'<p><span>Guten Tag '+anredeMail+'</span><p>Ihr Antrag wurde von unserem System entgegengenommen und zur Bearbeitung an das entsprechende Team weitergeleitet.' +
                                            '</br>Eine Gesamtübersicht Ihrer Tickets erhalten Sie unter http://10.51.7.30/santra/details?tsid='+orderidformail+' nach der Anmeldung.' +
                                            '</br></br>Vielen Dank und freundliche Grüsse' +
                                            '</br>Ihr ApplProjekte Supportteam ' +
                                            '</br>n|w</p>'
                                    };
                                    let messageSupport = {
                                        // sender info
                                        from: 'Santra <alesya.heymann@fhnw.ch>',
                                        // Comma separated list of recipients
                                        to: 'Applprojekte Team <alesya.heymann@fhnw.ch>',
                                        //to: '<alesya.heymann@fhnw.ch>',
                                        // Subject of the message
                                        subject: 'Santra: Antrag Nummer #'+orderidformail+'',

                                        // plaintext body
                                        text: 'Liebes Applprojekte Team</br></br>Ein neuer Antrag ist eingegangen: </br>Antrag Nummer '+orderidformail+' </br> Name der Software '+topic+' </br>Direktlinkt auf Antrag: http://10.51.7.30/santra/details?tsid='+orderidformail+' </br></br>Vielen Dank und freundliche Grüsse </br>Ihr ApplProjekte Supportteam </br>n|w',

                                        // HTML body
                                        html:'<p><span>Liebes Applprojekte Team</span></br></br><p>Ein neuer Antrag ist eingegangen: </br>Antrag Nummer '+orderidformail+' </br> Name der Software '+topic+' </br>Direktlinkt auf Antrag: http://10.51.7.30/santra/details?tsid='+orderidformail+' </br></br>Vielen Dank und freundliche Grüsse </br>Ihr ApplProjekte Supportteam </br>n|w</p>'
                                    };
                                    console.log('Sending Mail');
                                    transport.sendMail(messageSender, function(error){
                                        if(error){
                                            return console.log(error);
                                        }
                                    });
                                    transport.sendMail(messageSupport, function(error){
                                        if(error){
                                            return console.log(error);
                                        }
                                    });
                                }
                            })
                    })
            }
            else if (url == "/user"){
                pool.getConnection((err, connection) => {
                    if (err) throw err
                    sql2 = "INSERT INTO users (email, vorname, nachname) SELECT '"+obj_user.mail+"', '"+decodeURIComponent(obj_user.givenName)+"', '"+decodeURIComponent(obj_user.surname)+"' FROM DUAL WHERE NOT EXISTS (SELECT * FROM users WHERE email='"+obj_user.mail+"')";
                    connection.query(""+sql2+"",
                        (err, rows) => {
                        })
                })
                if (adminlog==true){
                    sql1 = 'SELECT * FROM applications WHERE (email = "alesya.heymann@fhnw.ch") OR (email <> "'+obj_user.mail+'" AND status <> 10) ORDER BY applicationid DESC';
                }
                else{
                    sql1 = 'SELECT * FROM applications WHERE (email = "alesya.heymann@fhnw.ch") ORDER BY applicationid DESC';
                }
                connection.query(""+sql1+"",
                    (err, rows) => {
                        connection.release();
                        if (!err) {
                            for (let i = 0; i < rows.length; i++) {
                                // Create an object to save current row's data
                                let statuscurrent;
                                switch (rows[i].status) {
                                    case 10:
                                        statuscurrent = 'Entwurf';
                                        break;
                                    case 1:
                                        statuscurrent = 'Antrag in Bearbeitung';
                                        break;
                                    case 2:
                                        statuscurrent = 'Antrag in Prüfung';
                                        break;
                                    case 3:
                                        statuscurrent = 'Antrag bei Gremium';
                                        break;
                                    case 4:
                                        statuscurrent = 'Antrag genehmigt';
                                        break;
                                    case 5:
                                        statuscurrent = 'Antrag abgelehnt';
                                        break;
                                }
                                switch (rows[i].orderstatus) {
                                    case 1:
                                        statuscurrent = 'Antrag genehmigt';
                                        break;
                                    case 2:
                                        statuscurrent = 'Antrag abgelehnt';
                                        break;
                                    case 3:
                                        ordercurrent = 'Antrag zu Gremium';
                                        break;
                                    case 4:
                                        statuscurrent = 'Antrag vom Gremium genehmigt';
                                        break;
                                    case 5:
                                        statuscurrent = 'Antrag vom Gremium abgelehnt';
                                        break;
                                }
                                let order = {
                                    'applicationid': rows[i].applicationid,
                                    'orderidmail': rows[i].applicationid,
                                    'application': rows[i].application,
                                    'approvednr': rows[i].approvednr,
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
                                    'confidentiality': rows[i].confidentiality,
                                    'destroy': rows[i].destroy,
                                    'deleted': rows[i].deleted,
                                    'repo': rows[i].repo,
                                    'located': rows[i].located,
                                    'dateapp': rows[i].dateapp,
                                    'deadline': rows[i].deadline,
                                    'comments': rows[i].comments,
                                    'status': statuscurrent
                                }
                                // Add object into array
                                softwareList.push(order);
                            }
                        } else {
                            console.log(err)
                        }
                    })
            }
            setTimeout(
                function () {
                    res.render('layout_user', {
                        "softwareList": softwareList,
                        "useridlog": LOGIN.useridlog,
                        "vornamelog": decodeURIComponent("Peter"),
                        "nachnamelog": decodeURIComponent("Muster"),
                        "emaillog": "alesya.heymann@fhnw.ch",
                        "admin": adminlog
                    });
                }, 1000);

        })
    };
};

