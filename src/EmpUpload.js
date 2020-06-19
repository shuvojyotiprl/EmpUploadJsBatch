var dbPrp = require('../util/EmpUploadUtil');
var messageRepo = require('../util/MessageRepo')
var MongoClient = require('mongodb').MongoClient;
var empl = require('../model/EmplMdl');

const fs = require('fs');
const csv = require('csv-parser');
var filePath = '../emp-upload/upload/';
const argv = require('yargs').argv


var employee = empl.employee;
var empArray = new Array();


var hrdtl = argv.hrdtl;
var wgdtl = argv.wgdtl;
var prjdtl = argv.prjdtl;
var fileName = argv.filename;

filePath = filePath + fileName;
console.log(filePath);


fs.readFile(filePath, (err, data) => {
    if (err) {
        console.log('NO SUCH FILE OR DIRECTORY');
        /**STORE ERROR INTO DB**/
        if (err) throw err;
    }
    else {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', function (data) {
                try {
                    var name = data.NAME;
                    var dob = data.DOB
                    var doj = data.DOJ;
                    var addr = data.ADDR;
                    var typ = data.TYPE;
                    var gen = data.GEN;

                    var e = new employee(null, name, dob, doj, addr, typ, gen, hrdtl, wgdtl, prjdtl);
                    empArray.push(e);
                }
                catch (err) {
                    console.log('FILE DATA ERROR');
                    console.log(err)
                }
            })
            .on('end', function () {
                console.log(messageRepo.FILE_READ_COMPLETED);

                MongoClient.connect(dbPrp.db_url_dev, { useUnifiedTopology: true }, (err, db) => {

                    if (err) throw err;

                    console.log(messageRepo.CONNECTION_ESTABLISHED_SUCCESS);

                    var dbo = db.db(dbPrp.db_name);
                    try {
                        /**validating HR Detail**/
                        dbo.collection(dbPrp.HR_LOOKUP).findOne({ id: hrdtl }, (err, result) => {
                            if (err) throw err;
                            console.log(result);
                            if (result == null) {

                                db.close();
                                throw messageRepo.INVALID_HRDTL;

                            }

                        });


                        /**Validating work group detail**/
                        dbo.collection(dbPrp.WG_LOOKUP).findOne({ id: wgdtl }, (err, result) => {
                            if (err) throw err;
                            console.log(result);
                            if (result == null) {
                                db.close();
                                throw messageRepo.INVALID_WGDTL;

                            }

                        });


                        /**Validating project detail**/
                        dbo.collection(dbPrp.PRJ_LOOKUP).findOne({ id: prjdtl }, (err, result) => {
                            if (err) throw err;
                            console.log(result);
                            if (result == null) {
                                db.close();
                                throw messageRepo.INVALID_PRJDTL;

                            }
                            console.log(messageRepo.VALID_WG_HR_PRJ);
                            db.close();
                        });


                    }
                    catch (err) {
                        console.log(err);
                        /**code to store error in db**/
                    }
                    //var employee = empl.employee;

                    db.db(dbPrp.db_name).collection(dbPrp.Elec_Upld_Col).insertMany(empArray, (err, res) => {
                         if (err) throw err;
                         console.log(messageRepo.REC_INSERTED_SUCCESS + "Rows inserted " + res.insertedCount);
                         db.close();
                     }); 

                });


            });


    }
});

