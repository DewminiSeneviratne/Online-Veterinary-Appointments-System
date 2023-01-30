let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");

chai.use(chaiHttp);
let should = chai.should();

describe('1. Home', () => {

    describe('/GET home', () => {

        it('/home - GET Home Page for User', (done) => {
            chai.request(app)
                .get('/home')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                })
        });


    });

});

describe('2. Appointments', () => {

    describe('/GET appointments', () => {

        it('/appointments - GET Appointments Page for User', (done) => {
            chai.request(app)
                .get('/appointments')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                })
        });


    });

});

describe('3. Services', () => {

    describe('/GET services', () => {

        it('/services - GET Services Page for User', (done) => {
            chai.request(app)
                .get('/services')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                })
        });


    });

});

describe('4. About', () => {

    describe('/GET about', () => {

        it('/about - GET About Page for User', (done) => {
            chai.request(app)
                .get('/about')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                })
        });


    });

});

describe('5. Contact', () => {

    describe('/GET contact', () => {

        it('/contact - GET Contact Us Page for User', (done) => {
            chai.request(app)
                .get('/contact')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                })
        });


    });

});

describe('6. Login', () => {

    describe('/GET login', () => {

        it('/login - GET Login Page for User', (done) => {
            chai.request(app)
                .get('/login')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                })
        });


    });

});


describe('7. Dashboard', () => {

    describe('/GET dashboard', () => {

        it('/dashboard - GET Dashboard for Admin', (done) => {
            chai.request(app)
                .get('/dashboard')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                })
        });


    });

});

describe('8. View Appointments List', () => {

    describe('/GET appointmentsAdmin', () => {

        it('/appointmentsAdmin - GET Appointments List for Admin', (done) => {
            chai.request(app)
                .get('/appointmentsAdmin')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                })
        });


    });

});

describe('9. View Inquiries List', () => {

    describe('/GET inquiriesAdmin', () => {

        it('/inquiriesAdmin - GET Inquiries List for Admin', (done) => {
            chai.request(app)
                .get('/inquiriesAdmin')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                })
        });


    });

});

describe('10. View Services List', () => {

    describe('/GET servicesAdmin', () => {

        it('/servicesAdmin - GET Services List for Admin', (done) => {
            chai.request(app)
                .get('/servicesAdmin')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                })
        });


    });

});

describe('11. Login', () => {

    describe('/POST login', () => {

        let loginInfo= {
            username: 'admin',
            password: 'admin123'
        }

        it('/login - POST Login Page', (done) => {
            chai.request(app)
                .post('/login')
                .send(loginInfo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                })
        });


    });

});

/*describe('12. Add Appointments', () => {

    describe('/POST appointments', () => {

        let AppointmentsInfo= {
            service: 'Vaccination',
            firstname: 'Farmaan',
            lastname: 'Sirisena',
            email: 'catpet@gmail.com',
            contactnumber: '763471788',
            date: '2024-01-30',
            message: 'hello'
            //appointmentID: '1'
        }

        it('/add - POST Appointments Page', (done) => {
            chai.request(app)
                .post('/add')
                .send(AppointmentsInfo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                })
        });


    });

});*/

/*describe('13. Add Inquiries', () => {

    describe('/POST inquiries', () => {

        let InquiryInfo= {
            contactname: 'Monica',
            contactemail: 'monica@gmail.com',
            contactno: '0711234567',
            message: 'Hi'
        }

        it('/add - POST Contact Page', (done) => {
            chai.request(app)
                .post('/add')
                .send(InquiryInfo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                })
        });


    });

});*/

describe('14. Add Services', () => {

    describe('/POST services', () => {

        let ServicesInfo= {
            servicename: 'abc',
            servicedescription: 'abcdef',
            price: 'Rs. 1000',
        }

        it('/addService - POST Services Page', (done) => {
            chai.request(app)
                .post('/addService')
                .send(ServicesInfo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                })
        });


    });

});


describe('12. Edit Appointments List', () => {

    describe('/GET editAppointments', () => {


        it('/editAppointments - GET (edit) Appointments List for Admin', (done) => {
            let id = '63ced2d93cf12fa9335bcbc0'

            chai.request(app)
                .get('/editAppointments/' +id)
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                })
        });


    });

});


describe('15. Edit Service', () => {

    describe('/GET editServices', () => {

        it('/editServices - GET Services List for Admin', (done) => {
            let serviceid = '63d80c9532ffaabb90255723'

            chai.request(app)
                .get('/editServices/' + serviceid)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                })
        });


    });

});



describe('16. Delete Inquiry', () => {

    describe('/GET deleteInquiry', () => {


        it('/deleteInquiry - GET delete inquiry for Admin', (done) => {
            let _id = '63d8181b14d9135bcb7a14fd'

            chai.request(app)
                .get('/deleteInquiry/'+_id)
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                })
        });


    });

});

