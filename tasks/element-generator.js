#! /usr/bin/env node

/* eslint no-console: 0*/

'use strict';

const path = require('path');
const {scaffold} = require('nunjucks-scaffold-generator');

const params = process.argv;
const [elementName, elementPath = 'src/'] = params.slice(2);
const DEST_PATH = path.resolve(process.cwd(), elementPath, elementName);
const TPLS_PATH = path.resolve(__dirname, 'tpls');

const camelCase = (str) => str.replace(/[-_]./g, (match) => match.charAt(1).toUpperCase());
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const titleCase = (str) => capitalize(camelCase(str));

const generate = (element) => {
  const templateParams = {
    name: element,
    titleCase,
  };

  scaffold({
    src: TPLS_PATH,
    dest: DEST_PATH,
    replacement: ['app-element', element],
    params: templateParams,
  });
};

if (elementName) {
  generate(elementName);
  console.log(`${elementName} created inside ${elementPath}`);
} else {
  console.log('ERROR: missing element name. Element not created.');
}
