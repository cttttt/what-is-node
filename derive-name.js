function deriveName() {
    var fs = require('fs');

    var name = process.argv[2] || process.env.NAME;

    try {
        name = name || fs.readFileSync('name.txt').toString().trim();
    } catch (e) {}

    name = name || 'Chris';
    
    return name;
}

module.exports = deriveName;
