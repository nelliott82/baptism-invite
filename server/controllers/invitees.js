const models = require('../models');
const url = require('url');

module.exports = {
  get: function (req, res) {
    const uuid = req.params.uuid;
    models.invitees.getOne(uuid, function(err, results) {
      if (err) {
        res.statusCode = 400;
        res.end(JSON.stringify(err));
      } else {
        if (results.length) {
          res.status(200);
          res.json({
            valid: true,
            name: results[0].name,
            guests: results[0].guests,
            language: results[0].language,
            attending: results[0].attending
          });
        } else {
          res.status(200);
          res.json({
            valid: false
          })
        }
      }
    });
  },
  put: function (req, res) {
    const data = req.body;

    models.invitees.update(data, function(err, results) {
      if (err) {
        res.statusCode = 400;
        res.end(JSON.stringify(err));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(results));
      }
    });
  }
}