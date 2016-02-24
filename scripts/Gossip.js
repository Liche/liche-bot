var connectionHelper = require('./lib/ConnectionHelper.js');
var AntiWeasel = require('./lib/AntiWeasel.js');

var Gossip = function(robot) {
  var antiWeasel = new AntiWeasel();

  var addGossip = function(gossip, msg) {
    var connection = connectionHelper.getConnection();

    connection.query('INSERT INTO gossip (gossip_text) VALUES (?)', [gossip], function(err) {
      if (err) {
        msg.reply('Something broke');
      }

      msg.reply('Gossip added');
    });
  }

  var deleteGossip = function(id, msg) {
    var connection = connectionHelper.getConnection();
    connection.query('DELETE FROM gossip WHERE id = ?', [id], function(err) {
      if (err) {
        msg.reply('Something broke');
      }

      msg.reply('Gossip deleted');
    });
  }

  var findGossip = function(text, msg) {
    var connection = connectionHelper.getConnection();
    var query = 'SELECT * FROM gossip';
    var queryArgs = [];

    if (text != null && text.length > 0) {
      query += ' WHERE gossip_text LIKE ?';
      queryArgs.push('%' + text + '%');
    }

    query += ' ORDER BY RAND() LIMIT 0,1';

    connection.query(query, queryArgs, function(err, rows) {
      if (err) {
        msg.reply('Something broke');
      }

      if (rows.length === 0) {
        msg.reply('No gossip found.');
        return;
      }
      msg.reply('[id:' + rows[0].id + ']\n' + rows[0].gossip_text);
    });
  }

  var getGossip = function(id, msg) {
    var connection = connectionHelper.getConnection();
    var query = 'SELECT * FROM gossip where id = ?';

    connection.query(query, [id], function(err, rows) {
      if (err) {
        msg.reply('Something broke');
      }

      if (rows.length === 0) {
        msg.reply('No gossip found.');
        return;
      }
      msg.reply('[id:' + rows[0].id + ']\n' + rows[0].gossip_text);
    });
  }

  robot.hear(/^\/gossip\s+add\s+([\s\S]+?)$/, function (msg) {
    if (!antiWeasel.check(msg.match[1])) {
      msg.reply('Don\'t be a weasel');
    } else {
      addGossip(msg.match[1], msg);
    }
  });

  robot.hear(/^\/gossip\s+remove\s+(\d+?)\s*$/, function (msg) {
    deleteGossip(msg.match[1], msg);
  });

  robot.hear(/^\/gossip\s*$/, function (msg) {
    findGossip(null, msg);
  });

  robot.hear(/^\/gossip\s+find\s+(.*?)\s*$/, function (msg) {
    findGossip(msg.match[1], msg);
  });

  robot.hear(/^\/gossip\s+get\s+(.*?)\s*$/, function (msg) {
    getGossip(msg.match[1], msg);
  });
}

module.exports = Gossip;
