#!/usr/bin/env node


const { program } = require('commander');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const prettier = require('prettier')
const { promisify } = require('util');

const renderTemplate = promisify(ejs.renderFile);
const read = promisify(fs.readFile);

const templatesDir = path.join(__dirname, '/templates');
const blocksDir = path.join(__dirname, '/components');

console.log(templatesDir);
console.log(blocksDir);


function formatClassName(name) {
    if (/(\w+)-(\w)([\w-]*)/.test(name)) {
        name = name.replace(/-./g, x => x[1].toUpperCase())
    }
    return name.charAt(0).toUpperCase() + name.slice(1)
}

program
    .version('1.0.0')
    .description('special version module service creator');

program
    .command('create <name>')
    .alias('c')
    .description('Create new service file.')
    .action(async (name, cmd) => {
        const serviceName = formatClassName(name);
        const dir = path.join(blocksDir, `/${name}/`);
        const fileDir = path.join(dir, `/${name}.js`);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        if (!fs.existsSync(fileDir)) {
            const str = await renderTemplate(path.join(templatesDir, '/service.tmpl'), { serviceName }, {});
            fs.writeFileSync(
                path.join(dir, `/${name}.js`),
                str
            );
        }
        const file = await read(path.join(__dirname, `/index.js`));
        if (file) {
            let text = file.toString();
            const newImportStr = `import ${serviceName} from './components/${name}/${name}';\r\n`;
            const newSettingsStr = await renderTemplate(path.join(templatesDir, '/conf.tmpl'), { serviceName, name }, {});


            const srvStr = /\s+this\.services = \[(\s+\w+\W)*\s+\];/gm.exec(text)[0];
            let srvCount = 0
            for (const match of srvStr.replace('this.services = [', '').matchAll(/\w+/g)) {
                srvCount++;
            }
            srvIndex = text.indexOf(srvStr) + srvStr?.length -5
            const newServStr = `,\r\n${serviceName}`;
            text = `${text.slice(0, srvIndex)}\r\n${newServStr}${text.slice(srvIndex)}`

            const newRegisterstr = `case '${serviceName}':  {return this.services[${srvCount}];}`;

            const importStr = /^import \w+ from '.\/components\/\w+\/\w+';$/gm.exec(text)[0];
            const endImportsIndex = text.indexOf(importStr) + importStr?.length;
            text = `${text.slice(0, endImportsIndex)}\r\n${newImportStr}${text.slice(endImportsIndex)}`

            const confStr = /];\s+const lngSettings = lng\? lng :{/gm.exec(text)[0];
            const confstrIndex = text.indexOf(confStr);
            text = `${text.slice(0, confstrIndex)}\r\n${newSettingsStr}${text.slice(confstrIndex)}`;

            const registerStr = /default: {\s+return null\s+}/gm.exec(text)[0];
            const registerStrIndex = text.indexOf(registerStr);
            text = `${text.slice(0, registerStrIndex)}\r\n${newRegisterstr}${text.slice(registerStrIndex)}`
            text = await prettier.format(text, { semi: false, parser: "babel" });
            fs.writeFileSync(
                path.join(path.join(__dirname, `/index.js`)),
                text
            );
            console.log(`new service ${serviceName} added to project`);
        }
    });

program.parse(process.argv);