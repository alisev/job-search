// saves some info to file
const fs = require('fs');

const _save = (content, filename, folder) => { // TODO: everything is seemingly right, but nothing is written to files!
    const d = new Date();
    const timestamp = d.getTime();
    const filepath = `./${folder}/${filename}-${timestamp}.txt`;
    fs.writeFileSync(filepath, content, { flag: 'w' }, err => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('File has been saved successfully!');
        }
    });
};

// saves debug files as-is (contentwise)
const saveDebug = (content, filename) => {
    const dir = "debugFiles";
    _save(content, filename, dir);
};

// saves found vacancies
const saveVacancies = (arr, filename) => {
    const dir = "output";
    let content = "";
    for (let item of arr) {
        content += `${item}\n`;
    }
    _save(content, filename, dir);
}

module.exports = {
    debug: saveDebug,
    vacancies: saveVacancies
};