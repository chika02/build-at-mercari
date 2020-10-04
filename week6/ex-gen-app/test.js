const request = require('supertest');
const session = require('supertest-session');
const app = require("./app");

describe("unit tests (before logged in)", () => {
    //GET request
    it('get index page', function(done){
        request(app)
          .get('/')
          .expect(302, done)
          .expect('Location','/login');
    });
    it('get login page', function(done){
        request(app)
          .get('/login')
          .expect(200, done)
    });
    it('get blogs page', function(done){
        request(app)
          .get('/blogs/hello')
          .expect(302, done)
          .expect('Location','/login');
    });
    it('get add page', function(done){
        request(app)
          .get('/add')
          .expect(302, done)
          .expect('Location','/login');
    });
    it('get edit page', function(done){
        request(app)
          .get('/edit/hello')
          .expect(302, done)
          .expect('Location','/login');
    });

    //POST request on login page
    it('post login page: incorrect pass', function(done){
        request(app)
          .post('/login')
          .send('username=chiki')
          .send('password=1234')
          .expect(200, done);
    });
    it('post login page: correct pass', function(done){
        request(app)
          .post('/login')
          .send('username=chika')
          .send('password=1234')
          .expect(302, done)
          .expect('Location','../');
    });
});

describe("unit tests (logged in)", () => {

    /*
    beforeEach(() => {
        app.post('/login', (req, res) => {
            req.send({username:'chika', password:'1234'});
            req.session.saveUninitialized = true;
        });
    });

    it('get index page: logged in', function(done){
        app.get('/', (req, res) => {
            expect(res.statusCode).toBe(200);
            expect(req.session.saveUninitialized).toBe(true);
        });
    });
    */

    beforeEach(() => {
        app.post('/login', (req, res) => {
            req.send({username:'chika', password:'1234'});
        });
    });

    it('get index page: logged in', function(done){
        request(app)
          .get('/')
          .expect(200, done)
    });
    it('get login page: logged in', function(done){
        request(app)
          .get('/login')
          .expect(200, done)
    });
    it('get blogs page: logged in', function(done){
        request(app)
          .get('/blogs/hello')
          .expect(200, done)
    });
    it('get add page: logged in', function(done){
        request(app)
          .get('/add')
          .expect(200, done)
    });
    it('get edit page: logged in', function(done){
        request(app)
          .get('/edit/hello')
          .expect(200, done)
    });

    //POST requests
    it('post index page', function(done){
        request(app)
          .post('/')
          .expect(302, done)
          .expect('Location','/add');

    });
    it('post "delete" on blog page', function(done){
        request(app)
          .post('/blogs/hello')
          .send('delete=Delete')
          .expect(302, done)
          .expect('Location','../');
    });
    it('post "delete" on blog page', function(done){
        request(app)
          .post('/blogs/hello')
          .send('edit=Edit')
          .expect(302, done)
          .expect('Location','../edit/hello');
    });
    it('post on edit page', function(done){
        request(app)
          .post('/edit/hello')
          .expect(302, done)
          .expect('Location','../../');
    });
});
