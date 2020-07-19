# Symlink Rewriter

Have you ever had a big ol' batch of symlinks and then you change the folder location and they all break? Sometimes they only require a sight adjustment to the path, but they _all_ require this adjustment and it takes forever to fix. Fear not, Symlink Rewriter™️ is here to save the day! With its innovative symlink batch rewriting technology, it can solve your batch symlink changing tasks with ease! Backed by _over 30 entire lines_ of hand-crafted javascript code ✨

## Usage

Let's say that you changed a containing folder's name from `foo` to `bar` and all your symlinks broke. Easy fix!

```js
const symlinkRewriter = require('symlink-rewriter')

const rootPath = __dirname
symlinkRewriter(rootPath, (symlinkDestination, filePath) => {
  return symlinkDestination.replace(/\/foo/, '/bar')
})
```

You may be nervous about running this bulk operation, because what if you did your regex wrong and then all your files are messed up? Fair enough - just pass the `dry` option into the third argument, and it won't do anything other than logging out the set of changes it plans to make, like this:

```js
const symlinkRewriter = require('symlink-rewriter')

const rootPath = __dirname
symlinkRewriter(
  rootPath,
  (symlinkDestination, filePath) => {
    return symlinkDestination.replace(/\/foo/, '/bar')
  },
  { dry: true }
)
```

Do you have nested directories you need to make changes to? That's ok as well, just pass in the `recursive` option and you're all set:

```js
const symlinkRewriter = require('symlink-rewriter')

const rootPath = __dirname
symlinkRewriter(
  rootPath,
  (symlinkDestination, filePath) => {
    return symlinkDestination.replace(/\/foo/, '/bar')
  },
  { recursive: true }
)
```

That's all there is to it! Happy symlink rewriting 😀
