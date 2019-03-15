const fs = require('fs');
const path = require('path');

fs.readdirSync(path.join(__dirname, 'models')).map(file => {
    // require('./models/'+file);
    const Model = file.split('.')[0];
    module.exports[Model] = require('./models/' + file);
});
