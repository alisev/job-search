// saves some info to file
const fs = require('fs');

const _save = (content, filename, folder) => {
    const d = new Date();
    const timestamp = d.getTime();

    const filepath = `./${folder}/${filename}-${timestamp}.txt`;
    fs.writeFile(filepath, content, { flag: 'a' }, err => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('File has been saved successfully!');
        }
    });
};

const saveDebug = (content, filename) => {
    const dir = "debugFiles";
    _save(content, filename, dir);
};

const saveFile = (arr, filename) => {
    const dir = "output";
    let content = "";
    for (let item of arr) {
        content += `${item}\n`;
    }
    _save(content, filename, dir);
}

module.exports = {
    debug: saveDebug,
    file: saveFile
};