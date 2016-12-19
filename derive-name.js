function deriveName(callback) {
    var fs = require('fs');

    var name = process.argv[2] || process.env.NAME;

    if (name) {
        callback(null, name);
        return;
    }

    fs.readFile('name.txt', function (err, data) {
        if (err) {
            callback(err);
            return;
        }

        callback(null, data.toString().trim());
    })
}

function deriveNameSync() {
    var fs = require('fs');

    var name = process.argv[2] || process.env.NAME;

    try {
        name = name || fs.readFileSync('name.txt').toString().trim();
    } catch (e) {}

    name = name || 'Chris';
    
    return name;
}

module.exports.deriveName = deriveName;
module.exports.deriveNameSync = deriveNameSync;
