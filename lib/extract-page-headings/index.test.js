/* eslint-env jest */

const metalsmith = require('metalsmith')
const plugin = require('./index.js')

describe('extract-page-headings plugin', () => {
  it('generated heading metadata matches expected', (done) => {
    metalsmith('lib/extract-page-headings/fixtures')
      .use(plugin())
      .build((err, files) => {
        if (err) {
          return done(err)
        }
        Object.keys(files).forEach((file) => {
          const metadataHeadings = files[file].headings
          const expectedHeadings = [
            { depth: 1, text: 'level 1 title', url: 'level-1-title' },
            { depth: 2, text: 'level 2 title', url: 'level-2-title' },
            { depth: 3, text: 'level 3 title', url: 'level-3-title' }
          ]
          expect(metadataHeadings).toEqual(expectedHeadings)
        })
        done()
      })
  })
})
