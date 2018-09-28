const env = require('dotenv').config().parsed;
const fs = require('fs');

console.log("env:", env);

const key2name = require('@code.gov/coding-languages').reduce((dict, lang) => {
  dict[lang.toLowerCase()] = lang;
  return dict;
}, {});

console.log("key2name:", key2name);

const { CodeGovAPIClient } = require('@code.gov/api-client/src/index.js');

console.log("CodeGovAPIClient:", typeof CodeGovAPIClient);

const client = new CodeGovAPIClient({
  api_key: env.CODE_GOV_API_KEY
});

client.repos({size: 10000}).then(data => {
  const used = new Set();
  data.repos.forEach(repo => {
    if (Array.isArray(repo.languages)) {
      repo.languages.forEach(lang => {
        const key = lang.toLowerCase();
        if (key2name.hasOwnProperty(key)) {
          used.add(key2name[key]);
        }
      });
    }
  });
  console.log("used:", used);

  const sorted = Array.from(used).sort((a, b) => {
    return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
  });

  const filterData = sorted.map(language => {
    return { name: language, value: language.toLowerCase(), checked: false };
  });

  fs.writeFileSync('src/data/filters/languages.json', JSON.stringify(filterData), 'utf-8');
  console.log("write data/languages.json");
});