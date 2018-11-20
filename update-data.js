const axios = require('axios');
const fs = require('fs');

function download(url, path) {
  axios.get(url).then(response => {
    console.log(`successfully got ${url}`)
    fs.writeFileSync(path, JSON.stringify(response.data), 'utf-8')
    console.log(`wrote ${path}`)
  })
}

download('https://raw.githubusercontent.com/GSA/code-gov-data/master/schemas/schema-2.0.0.json', './assets/data/schema.json');
download('https://github.com/GSA/code-gov-data/raw/master/filters/repos/all.json', './assets/data/filters/repos.json')
download('https://github.com/GSA/code-gov-data/raw/master/filters/tasks/all.json', './assets/data/filters/tasks.json')