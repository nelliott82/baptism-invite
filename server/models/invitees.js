const db = require('../db');
const sqlstring = require('sqlstring');

module.exports = {
  getOne: function (uuid, callback) {
    db.connection.connect();
    db.connection.query(`SELECT name, guests, language FROM baptismInvitees WHERE uuid = '${uuid}' AND attending IS NULL`, null, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
  update: function (data, callback) {
    db.connection.connect();

    const update = `UPDATE baptismInvitees
                    SET guestsResponse = ${data.guests}, attending = ${data.attending}
                    WHERE uuid = '${data.uuid}'`;
    db.connection.query(update, null, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
};