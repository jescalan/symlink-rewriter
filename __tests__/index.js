const fs = require('fs')
const path = require('path')
const symlinkRewriter = require('../')

test('basic', () => {
  const rootDir = path.join(__dirname, 'fixtures/basic')
  const bazfile = path.join(rootDir, 'baz.txt')
  symlinkRewriter(rootDir, (link) => link.replace(/foo/, 'bar'))
  expect(fs.readlinkSync(bazfile)).toEqual('./bar.txt')
  // reset the changes
  fs.unlinkSync(bazfile)
  fs.symlinkSync('./foo.txt', bazfile)
})

test('recursive option', () => {
  const rootDir = path.join(__dirname, 'fixtures/recursive')
  const bazfile = path.join(rootDir, 'nested/baz.txt')
  symlinkRewriter(rootDir, (link) => link.replace(/foo/, 'bar'), {
    recursive: true,
  })
  expect(fs.readlinkSync(bazfile)).toEqual('../bar.txt')
  // reset the changes
  fs.unlinkSync(bazfile)
  fs.symlinkSync('../foo.txt', bazfile)
})

test('dry run option', () => {
  const consoleSpy = jest.spyOn(console, 'log')
  const rootDir = path.join(__dirname, 'fixtures/basic')
  symlinkRewriter(rootDir, (link) => link.replace(/foo/, 'bar'), { dry: true })
  // logs the right thing
  expect(consoleSpy).toHaveBeenCalledTimes(1)
  expect(consoleSpy).toHaveBeenCalledWith(
    expect.stringMatching(/replacing symlink/)
  )
  expect(consoleSpy).toHaveBeenCalledWith(
    expect.stringMatching(/old path: \.\/foo.txt/)
  )
  expect(consoleSpy).toHaveBeenCalledWith(
    expect.stringMatching(/new path: \.\/bar.txt/)
  )
  // doesn't actually make any changes
  expect(fs.readlinkSync(path.join(rootDir, 'baz.txt'))).toEqual('./foo.txt')
})
