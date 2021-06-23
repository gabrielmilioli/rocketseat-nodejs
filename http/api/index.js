const http = require('http')
const fs = require('fs')
const path = require('path')

const data = require('./urls.json')

function writeFile(callback) {
  fs.writeFile(
    path.join(__dirname, 'urls.json'),
    JSON.stringify(data, null, 2),
    err => {
      if (err) throw err;
      callback(JSON.stringify({ message: 'ok' }));
    }
  )
}

http.createServer((req, res) => {
  res.writeHead(200, { 'Access-Controls-Allow-Origin': '*' })

  var baseURL = 'http://' + req.headers.host + '/';
  var myURL = new URL(req.url, baseURL);
  const searchParams = myURL.searchParams;
  const name = searchParams.get('name');
  const url = searchParams.get('url');
  const del = searchParams.get('del');

  if (!name || !url)
    return res.end(JSON.stringify(data));

  if (del) {
    data.urls = data.urls.filter(item => String(item.url) !== String(url));
    return writeFile((message) => res.end(message));
  }

  data.urls.push({ name, url });

  return writeFile((message) => res.end(message));

}).listen(3000, () => console.log('Api server is running'))