const fs = require('fs');
const path = require('path');

const MAX_FILES = 1000;

const i18n = require('./i18n.json');
const ignoreConfig = require('./ignore.json');

function shouldIgnore(filePath, isFolder = false) {
    const relativePath = path.relative(process.cwd(), filePath);
    const { folders, files } = ignoreConfig;
    return (isFolder && folders.includes(relativePath)) || (!isFolder && files.includes(path.basename(filePath)));
}

function countFiles(folderPath) {
    let count = 0;
    const files = fs.readdirSync(folderPath);
    files.forEach(file => {
        const filePath = path.join(folderPath, file);
        const stats = fs.statSync(filePath);
        if (stats.isFile() && !shouldIgnore(filePath)) {
            count++;
        } else if (stats.isDirectory() && !shouldIgnore(filePath, true)) {
            count += countFiles(filePath);
        }
    });
    return count;
}

function processFolder({ folderPath, outputPath, lang = 'en' }) {
    const filesCount = countFiles(folderPath);
    if (filesCount > MAX_FILES) {
        console.log(`${i18n[lang]['The number of files exceeds the limit of']} ${MAX_FILES}`);
        return;
    }
    console.log(`${i18n[lang]['Starting writing output file']} ${outputPath}`);
    const output = fs.createWriteStream(outputPath);

    output.write(`${i18n[lang]['These are the files:']}\n`);

    function processFile(filePath) {
        console.log(`${i18n[lang]['Writing file']} ${filePath}`);
        output.write(`\n${path.relative(process.cwd(), filePath)}:\n`);
        output.write(fs.readFileSync(filePath));
    }

    function processFolderRecursive(folderPath) {
        const files = fs.readdirSync(folderPath);
        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            const stats = fs.statSync(filePath);
            if (stats.isFile() && !shouldIgnore(filePath)) {
                processFile(filePath);
            } else if (stats.isDirectory() && !shouldIgnore(filePath, true)) {
                processFolderRecursive(filePath);
            }
        });
    }

    processFolderRecursive(folderPath);

    output.end();
    console.log(`${i18n[lang]['Finished writing output file']} ${outputPath}`);
}

if (process.argv.length < 3) {
    console.log(`${i18n['en']['Usage']}`);
    process.exit(1);
}

const folderPath = process.argv.find(arg => arg.startsWith('folder=')).split('=')[1];
const outputPath = process.argv.find(arg => arg.startsWith('output=')).split('=')[1];
const lang = process.argv.find(arg => arg.startsWith('lang='))?.split('=')[1];


processFolder({ folderPath, outputPath, lang });
