import * as fs from "fs";

export function deleteFolderRecursive(path: string) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      const curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

export function rmdirAsync(path: string, callback: any) {
  fs.readdir(path, (err, files) => {
    if (err) {
      // Pass the error on to callback
      callback(err, []);
      return;
    }
    const wait = files.length;
    let count = 0;
    const folderDone = (error?: any) => {
      count++;
      // If we cleaned out all the files, continue
      if (count >= wait || error) {
        fs.rmdir(path, callback);
      }
    };
    // Empty directory to bail early
    if (!wait) {
      folderDone();
      return;
    }

    // Remove one or more trailing slash to keep from doubling up
    path = path.replace(/\/+$/, "");
    files.forEach(file => {
      const curPath = path + "/" + file;
      fs.lstat(curPath, (error, stats) => {
        if (error) {
          callback(error, []);
          return;
        }
        if (stats.isDirectory()) {
          rmdirAsync(curPath, folderDone);
        } else {
          fs.unlink(curPath, folderDone);
        }
      });
    });
  });
}
