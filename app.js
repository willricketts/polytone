var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var contact = require('./routes/contact');
var mandrill = require('mandrill-api/mandrill');
var mandrillClient = new mandrill.Mandrill(process.env.mandrill_key);
var validator = require('validator');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.post('/contact', function(req, res, next) {
  var b = req.body;
  var errors = [];
  console.log(b);

  if(!b.name) {
    errors.push('missingName');
  }

  if(!b.email) {
    errors.push('missingEmail');
  }
  else if(!validator.isEmail(b.email)) {
    errors.push('invalidEmail');
  }

  if(!b.message) {
    errors.push('missingMessage');
  }

  if(errors.length > 0) {
    console.log(errors);
    res.send(JSON.stringify({ errors: errors }));
  }
  else {
    var message = {
      "text": b.message,
      "subject": '*** New contract inquiry: ' + b.name + ' | ' + b.email + ' ***',
      "from_email": b.email,
      "from_name": "Polytone Contact Form",
      "to": [{
        "email": process.env.contact_form_recipient_email,
        "name": process.env.contact_form_sender_name,
        "type": "to"
      }],
      "headers": {
        "Reply-To": b.email
      }
    };

    mandrillClient.messages.send({ "message": message }, function(result) {
      if(!result) {
        console.log('failed');
      }
      else {
        console.log(result);
        res.send('success');
      }
    });
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
