const models = require('../models');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  verify: function (req, res) {
    const sessionId = req.cookies.session_id;
    const data = { ...req.params, ...req.cookies };

    models.admin.verify(data, function(err, results) {
      if (err || (req.params.uuid !== '123' && results[0].hashword)) {
        res.statusCode = 400;
        res.end(JSON.stringify(err));
      } else {
        res.statusCode = 200;

        if (results[0].hashword) {
          const sessionEnds = new Date(results[0].session_ends);
          const now = new Date();
          if (now > sessionEnds || results[0].session_id !== sessionId) {
            res.json({
              login: true
            });
          } else {
            res.json({
              login: false
            });
          }
        } else {
          res.json({
            login: true
          });
        }
      }
    });
  },
  login: function (req, res) {
    models.admin.login(req.body, function(err, results, sessionId) {
      if (err) {
        res.statusCode = 400;
        res.end(JSON.stringify(err));
      } else {
        const sessionExpires = new Date();
        sessionExpires.setMonth(sessionExpires.getMonth() + 2);
        res.cookie('session_id', sessionId, { expires: sessionExpires, httpOnly: true });

        res.statusCode = 200;
        res.end(JSON.stringify(results));
      }
    });
  },
  logout: function (req, res) {
    models.admin.logout(req.body, function(err, results) {
      if (err) {
        res.statusCode = 400;
        res.end(JSON.stringify(err));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(results));
      }
    });
  },
  get: function (req, res) {
    const data = { ...req.params, ...req.cookies };

    models.admin.getAll(data, function(err, results) {
      if (err) {
        res.statusCode = err === 500 ? err : 400;
        res.end(JSON.stringify(err));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(results));
      }
    });
  },
  post: function (req, res) {
    const data = { ...req.body, ...req.cookies };

    models.admin.insert(data, function(err, results) {
      if (err) {
        res.statusCode = 400;
        res.end(JSON.stringify(err));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(results));
      }
    });
  },
  delete: function (req, res) {
    const data = { id: req.params.id, session_id: req.cookies.session_id };

    models.admin.delete(data, function(err, results) {
      if (err) {
        res.statusCode = 400;
        res.end(JSON.stringify(err));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(results));
      }
    });
  },
}