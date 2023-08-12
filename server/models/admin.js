const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const sqlstring = require('sqlstring');
const bcrypt = require('bcryptjs');

module.exports = {
  verify: function (data, callback) {
    db.connection.connect();
    db.connection.query(`SELECT * FROM admin WHERE uuid = '${data.uuid}' OR session_id = '${data.session_id}'`, null, (err, results) => {
      if (err) {
        callback(err);
      } else if (!results.length) {
        callback('Access denied');
      } else {
        callback(null, results);
      }
    });
  },
  login: function (data, callback) {
    db.connection.connect();
    const email = sqlstring.escape(data.email);

    db.connection.query(`SELECT * FROM admin WHERE email = ${email}`, null, (err, results) => {
      if (err) {
        callback(err);
      } else if (!results.length) {
        callback('Access denied');
      } else {
        const hashword = results[0].hashword;
        let sessionEnds = new Date();
        sessionEnds.setMonth(sessionEnds.getMonth() + 2);
        sessionEnds = sessionEnds.toISOString().split('T')[0];
        const sessionId = uuidv4();

        if (hashword) {
          bcrypt.compare(data.password, hashword, function(err, isMatch) {
            if (isMatch) {
              const update = `UPDATE admin
                              SET session_ends = '${sessionEnds}', session_id = '${sessionId}'
                              WHERE email = ${email}`;

              db.connection.query(update, null, (err, results) => {
                if (err) {
                  callback(err);
                } else {
                  callback(null, results, sessionId);
                }
              });
            } else {
              callback('Incorrect Password');
            }
          });
        } else {
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(data.password, salt, function(err, hash) {

              const update = `UPDATE admin
                              SET hashword = '${hash}', session_ends = '${sessionEnds}', session_id = '${sessionId}'
                              WHERE uuid = '${data.uuid}'`;

              db.connection.query(update, null, (err, results) => {
                if (err) {
                  callback(err);
                } else {
                  callback(null, results, sessionId);
                }
              });
            });
          });
        }
      }
    });
  },
  logout: function (data, callback) {
    db.connection.connect();
    let sessionEnds = new Date();
    sessionEnds.setDate(sessionEnds.getDate() - 1);
    sessionEnds = sessionEnds.toISOString().split('T')[0];

    const update = `UPDATE admin
                    SET session_ends = '${sessionEnds}'
                    WHERE session_id = '${data.session_id}'`;

    db.connection.query(update, null, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
  getAll: function (data, callback) {
    db.connection.connect();
    const getAll = `SELECT * FROM baptismInvitees
                    WHERE EXISTS (SELECT * FROM admin WHERE uuid = '${data.uuid}' OR session_id = '${data.session_id}');`
    db.connection.query(getAll, null, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
  insert: function (data, callback) {
    db.connection.connect();
    const name = sqlstring.escape(data.name);
    const contact = sqlstring.escape(data.contact);
    const insert_uuid = uuidv4();
    const insert = `INSERT INTO baptismInvitees (uuid, name, contact, guests, language)
                    SELECT '${insert_uuid}', ${name}, ${contact}, ${data.guests}, ${data.language}
                    FROM dual
                    WHERE EXISTS (SELECT * FROM admin WHERE session_id = '${data.session_id}')`;
    db.connection.query(insert, null, (err, results) => {
      if (err) {
        callback(err);
      } else {
        db.connection.query(`SELECT * FROM baptismInvitees`, null, (err, results) => {
          if (err) {
            callback(err);
          } else {
            callback(null, results);
          }
        })
      }
    });
  },
  delete: function (data, callback) {
    db.connection.connect();

    const deletion = `DELETE FROM baptismInvitees WHERE id = ${data.id} AND EXISTS (SELECT * FROM admin WHERE session_id = '${data.session_id}')`;
    db.connection.query(deletion, null, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  }
};