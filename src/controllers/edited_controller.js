let db = require('../libs/db');
const mysql = require('mysql');
let CONSTANTS = require("../libs/constants");
const LOGIN = require("../login");
const nodemailer = require("nodemailer");
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
        page.title = "Ethra - Antrag auf Genehmigung eines Forschungsvorhabens" +
            "Pädagogische Hochschule FHNW";
        let tsID = parseInt(req.query.tsid);
        let status = req.body.status;
        let sendorder;
        pool.getConnection((err, connection) => {
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
            let signature = req.body.signature;
            let dateapp = req.body.dateapp;
            let deadline = req.body.deadline;
            let comments = req.body.comments;
            let ex1 = req.body.ex1;
            let softwareListDetails = [];
            let anredeMail;
            if (status == 1) {
                if (title == "Neutrale Anrede"){
                    anredeMail = req.body.firstname +' '+req.body.lastname;
                }
                else{
                    anredeMail = title +' '+req.body.lastname;
                }
                sql = 'UPDATE applications SET application="'+application+'", approvednr="'+approvednr+'", title="'+title+'", firstname="'+firstname+'", lastname="'+lastname+'", email="'+email+'", institute="'+institute+'", finance="'+finance+'", subdiscipline="'+subdiscipline+'", topic="'+topic+'", summ="'+summ+'", appraisal="'+appraisal+'", registration="'+registration+'", registrationtext="'+registrationtext+'", participants="'+participants+'", personaldata="'+personaldata+'", recruited="'+recruited+'", informedbefore="'+informedbefore+'", execution="'+execution+'", instructions="'+instructions+'", informedafter="'+informedafter+'", compensation="'+compensation+'", compensationtext="'+compensationtext+'", performanced="'+performanced+'", voluntary="'+voluntary+'", voluntaryfile="'+voluntaryfile+'", notparticipate="'+notparticipate+'", notparticipatetext="'+notparticipatetext+'", withdraw="'+withdraw+'", agreement="'+agreement+'", agreementfile="'+agreementfile+'", participationundersixteen="'+participationundersixteen+'", participationundersixteentext="'+participationundersixteentext+'", risk="'+risk+'", risktext="'+risktext+'", riskfile="'+riskfile+'", integrity="'+integrity+'", integritytext="'+integritytext+'", mentalintegrity="'+mentalintegrity+'", mentalintegritytext="'+mentalintegritytext+'", socialintegrity="'+socialintegrity+'", socialintegritytext="'+socialintegritytext+'", charges="'+charges+'", reason="'+reason+'", experience="'+experience+'", experiencetext="'+experiencetext+'", illusion="'+illusion+'", illusiontext="'+illusiontext+'", observation="'+observation+'", media="'+media+'", anonymized="'+anonymized+'", confidentiality="'+confidentiality+'", destroy="'+destroy+'", deleted="'+deleted+'", repo="'+repo+'", located="'+located+'", signature="'+signature+'", dateapp="'+dateapp+'", deadline="'+deadline+'", comments="'+comments+'", status="'+status+'", ex1="'+ex1+'" WHERE applicationid="'+tsID+'"'
                sendorder = 1;
                let transport2 = nodemailer.createTransport({
                    host: "lmailer.fhnw.ch",
                    secure: false, // use SSL
                    port: 25,
                    tls: {
                        rejectUnauthorized: false
                    }
                });
                let messageSender2 = {
                    // sender info
                    from: 'Ethra <alesya.heymann@fhnw.ch>',

                    // Comma separated list of recipients
                    to: email,

                    // Subject of the message
                    subject: "E-Mail an Antragsteller Ethra: Antrag Nummer #"+tsID+" in Prüfung",

                    // plaintext body
                    text: 'Guten Tag '+anredeMail+', Ihr Antrag wurde zur Prüfung weitergeleitet. Eine Gesamtübersicht Ihrer Tickets erhalten Sie unter http://10.51.7.122/ethra/details?tsid='+tsID+' nach der Anmeldung. \n' +
                        '\n' +
                        'Vielen Dank und freundliche Grüsse \n' +
                        'Ihr .... Supportteam \n' +
                        'n|w\n',
                    // HTML body
                    html:'<p><span>Guten Tag '+anredeMail+'</span><p>Ihr Antrag wurde von unserem System entgegengenommen und zur Prüfung weitergeleitet.' +
                        '</br>Eine Gesamtübersicht Ihrer Tickets erhalten Sie unter http://10.51.7.122/ethra/details?tsid='+tsID+' nach der Anmeldung.' +
                        '</br></br>Vielen Dank und freundliche Grüsse' +
                        '</br>Ihr .... Supportteam ' +
                        '</br>n|w</p>'
                };
                let messageSupport2 = {
                    // sender info
                    from: 'Ethra <alesya.heymann@fhnw.ch>',
                    // Comma separated list of recipients
                    to: 'Wassilis <alesya.heymann@fhnw.ch>',
                   // to: '<alesya.heymann@fhnw.ch>',
                    // Subject of the message
                    subject: "Ethra: Antrag Nummer #"+tsID+"",
                    // plaintext body
                    text: 'Lieber Wassilis</br></br>Ein neuer Antrag ist eingegangen: </br>Antrag Nummer '+tsID+' </br> Thema/Titel des Vorhabens '+topic+' </br>Direktlinkt auf Antrag: http://10.51.7.122/ethra/details?tsid='+tsID+' </br></br>Vielen Dank und freundliche Grüsse </br>Ihr ... Supportteam </br>n|w',
                    // HTML body
                    html:'<p><span>Lieber Wassilis</span></br></br><p>Ein neuer Antrag ist eingegangen: </br>Antrag Nummer '+tsID+' </br> Thema/Titel des Vorhabens '+topic+' </br>Direktlinkt auf Antrag: http://10.51.7.122/ethra/details?tsid='+tsID+' </br></br>Vielen Dank und freundliche Grüsse </br>Ihr ... Supportteam </br>n|w</p>'

                };
                transport2.sendMail(messageSender2, function(error){
                    if(error){
                        console.log('Error occured');
                        console.log(error.message);
                        return;
                    }
                    console.log('Message sent successfully!');
                    transport2.close();
                });
                transport2.sendMail(messageSupport2, function(error){
                    transport2.close();
                });
            }
                else if (status == 0) {
                sql = 'UPDATE applications SET application="'+application+'", approvednr="'+approvednr+'", title="'+title+'", firstname="'+firstname+'", lastname="'+lastname+'", email="'+email+'", institute="'+institute+'", finance="'+finance+'", subdiscipline="'+subdiscipline+'", topic="'+topic+'", projectduration="'+projectduration+'", summ="'+summ+'", appraisal="'+appraisal+'", registration="'+registration+'", registrationtext="'+registrationtext+'", participants="'+participants+'", personaldata="'+personaldata+'", recruited="'+recruited+'", informedbefore="'+informedbefore+'", execution="'+execution+'", instructions="'+instructions+'", informedafter="'+informedafter+'", compensation="'+compensation+'", compensationtext="'+compensationtext+'", performanced="'+performanced+'", voluntary="'+voluntary+'", voluntaryfile="'+voluntaryfile+'", notparticipate="'+notparticipate+'", notparticipatetext="'+notparticipatetext+'", withdraw="'+withdraw+'", agreement="'+agreement+'", agreementfile="'+agreementfile+'", participationundersixteen="'+participationundersixteen+'", participationundersixteentext="'+participationundersixteentext+'", risk="'+risk+'", risktext="'+risktext+'", integrity="'+integrity+'", integritytext="'+integritytext+'", mentalintegrity="'+mentalintegrity+'", mentalintegritytext="'+mentalintegritytext+'", socialintegrity="'+socialintegrity+'", socialintegritytext="'+socialintegritytext+'", charges="'+charges+'", reason="'+reason+'", experience="'+experience+'", experiencetext="'+experiencetext+'", illusion="'+illusion+'", illusiontext="'+illusiontext+'", observation="'+observation+'", media="'+media+'", anonymized="'+anonymized+'", confidentiality="'+confidentiality+'", destroy="'+destroy+'", deleted="'+deleted+'", repo="'+repo+'", located="'+located+'", signature="'+signature+'", dateapp="'+dateapp+'", deadline="'+deadline+'", comments="'+comments+'", ex1="'+ex1+'" WHERE applicationid="'+tsID+'"'
                sendorder = 0;
                }
            connection.query(""+sql+"",
                (err, rows) => {
                connection.release() // return the connection to pool
                if (!err) {
                    for (let i = 0; i < rows.length; i++) {
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
                            'signature': rows[i].signature,
                            'dateapp': rows[i].dateapp,
                            'deadline': rows[i].deadline,
                            'comments': rows[i].comments,
                            'status': rows[i].status,
                            'proc': rows[i].proc,
                            'ex1': rows[i].ex1
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
                    res.render('layout_edited', {
                        "softwareListDetails": softwareListDetails,
                        "status": status,
                        "vornamelog": decodeURIComponent("Peter"),
                        "nachnamelog": decodeURIComponent("Muster"),
                        "emaillog": "alesya.heymann@fhnw.ch",
                        "sendorder": sendorder,
                        "admin": adminlog
                    });
                }, 500);
        })
    };
};
