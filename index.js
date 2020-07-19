const path = require('path')
const fs = require('fs')

module.exports = function rewriteSymlinks(root, cb, opts = {}) {
  return fs.readdirSync(root).map((f) => {
    const p = path.join(root, f)
    const lstat = fs.lstatSync(p)

    if (lstat.isSymbolicLink()) {
      const newSymlinkLocation = cb(fs.readlinkSync(p), p)
      if (opts.dry) {
        console.log(
          `replacing symlink:\n- symlink location: ${p.replace(
            root,
            ''
          )}\n- old path: ${fs.readlinkSync(
            p
          )}\n- new path: ${newSymlinkLocation}\n`
        )
      } else {
        fs.unlinkSync(p)
        fs.symlinkSync(newSymlinkLocation, p)
      }
    }
    if (opts.recursive && lstat.isDirectory())
      return rewriteSymlinks(p, cb, opts)
    return p
  })
}
