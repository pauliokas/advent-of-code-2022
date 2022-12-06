#!/usr/bin/env node

/* eslint-disable no-console */

const fs = require('fs');
const https = require('https');
const path = require('path');
const { program } = require('commander');

program
  .option('-o, --output <file>', 'output file')
  .requiredOption('-y, --year <year>', 'year to download input for', (val) => parseInt(val, 10), 2022)
  .requiredOption('-d, --day <day>', 'day to download input for', (val) => parseInt(val, 10));

program.parse();

const { year, day, output } = program.opts();

const sessionCookieFile = '.session-cookie';
if (!fs.existsSync(sessionCookieFile)) {
  console.error(`Missing ${sessionCookieFile} file`);
  process.exit(1);
}

const session = fs.readFileSync(sessionCookieFile, 'utf8').trim();

const outputPath = output ? path.parse(output) : path.join('src', `day${`0${day}`.slice(-2)}`, 'input.txt');

https
  .request(
    `https://adventofcode.com/${year}/day/${day}/input`,
    { headers: { cookie: `session=${session}` } },
    (res) => {
      const chunks = [];

      res.on('data', (chunk) => chunks.push(chunk));

      res.on('end', () => {
        if (res.statusCode !== 200) {
          console.error(`Failed to download input for day ${day} of year ${year}:`);
          console.error(chunks.join(''));
          process.exit(1);
        }

        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath.toString(), chunks.join(''));
      });
    },
  )
  .end();
