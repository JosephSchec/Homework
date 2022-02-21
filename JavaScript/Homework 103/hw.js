const app = require('connect')();

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>explore home and about page<h1>')
    next();
});
app.use('/home', (req, res, next) => {
    res.end('<h1>Welcome to home page to continue use magicword</h1>');
})

app.use(require('./usePlease'));

app.use('/about', (req, res, next) => {
    res.end('<h2>Only cause you asked nicely</>')
});

app.use((error, req, res, next) => {
    res.statusCode = error.statusCode || 500;
    res.end(`OOPS - ${error.message}`);
});


app.listen(80)