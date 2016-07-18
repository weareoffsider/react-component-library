import mkdirp from 'mkdirp';
import fs from 'fs';


export function writePage (path, content, callback) {
  mkdirp(path, function(err) {
    if (!err) {
      fs.writeFile(path + '/index.html', content, 'utf8', callback)
    }
  })
}
