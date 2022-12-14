/* global beforeEach, chai, describe, it */

const inBrowser = typeof window !== 'undefined'

describe('slug', function () {
  const slug = (inBrowser && window.slug) || require('../slug')
  const assert = typeof chai === 'undefined' ? require('assert') : chai.assert

  beforeEach(slug.reset)

  it('requires an argument', function () {
    assert.throws(slug, /slug\(\) requires a string argument/)
  })

  it('should replace whitespaces with replacement', function () {
    assert.strictEqual(slug('foo bar baz'), 'foo-bar-baz')
    assert.strictEqual(slug('foo bar baz', '_'), 'foo_bar_baz')
    assert.strictEqual(slug('foo bar baz', ''), 'foobarbaz')
  })

  it('should replace multiple spaces and dashes with a single instance', function () {
    assert.strictEqual(slug('foo  bar--baz'), 'foo-bar-baz')
  })

  it('should remove trailing space if any', function () { assert.strictEqual(slug(' foo bar baz '), 'foo-bar-baz') })

  it('should preserve leading/trailing replacement characters if option set', function () {
    assert.strictEqual(slug(' foo bar baz ', { trim: false }), '-foo-bar-baz-')
  })

  it('should remove punctuation by default', function () {
    const punctuation = ['*', '_', '+', '~', '.', ',', '[', ']', '(', ')', '\'', '"', '!', ':', '@']
    punctuation.forEach(function (symbol) {
      assert.strictEqual(slug('foo ' + symbol + ' bar baz'), 'foo-bar-baz')
    })
    assert.strictEqual(slug('foo_bar. -baz!'), 'foobar-baz')
    assert.strictEqual(slug('foo_bar-baz_bing!', { replacement: '_' }), 'foo_barbaz_bing')
  })

  it('should consolidate hyphen and space chars', function () {
    assert.strictEqual(slug('foo- bar baz'), 'foo-bar-baz')
  })

  it('should leave allowed chars in rfc3986 mode', function () {
    const allowed = ['.', '_', '~']
    allowed.forEach(function (a) {
      assert.strictEqual(slug('foo ' + a + ' bar baz', { mode: 'rfc3986' }), 'foo-' + a + '-bar-baz')
    })
  })

  it('should preserve punctuation added to charmap', function () {
    slug.charmap._ = '_'
    assert.strictEqual(slug('foo_bar baz'), 'foo_bar-baz')
  })

  it('should replace latin chars', function () {
    const charMap = {
      ??: 'A',
      ??: 'A',
      ??: 'A',
      ??: 'A',
      ??: 'A',
      ??: 'A',
      ??: 'AE',
      ??: 'C',
      ??: 'E',
      ??: 'E',
      ??: 'E',
      ??: 'E',
      ??: 'I',
      ??: 'I',
      ??: 'I',
      ??: 'I',
      ??: 'D',
      ??: 'N',
      ??: 'O',
      ??: 'O',
      ??: 'O',
      ??: 'O',
      ??: 'O',
      ??: 'O',
      ??: 'O',
      ??: 'U',
      ??: 'U',
      ??: 'U',
      ??: 'U',
      ??: 'U',
      ??: 'Y',
      ??: 'TH',
      ??: 'ss',
      ??: 'a',
      ??: 'a',
      ??: 'a',
      ??: 'a',
      ??: 'a',
      ??: 'a',
      ??: 'ae',
      ??: 'c',
      ??: 'e',
      ??: 'e',
      ??: 'e',
      ??: 'e',
      ??: 'i',
      ??: 'i',
      ??: 'i',
      ??: 'i',
      ??: 'd',
      ??: 'n',
      ??: 'o',
      ??: 'o',
      ??: 'o',
      ??: 'o',
      ??: 'o',
      ??: 'o',
      ??: 'o',
      ??: 'OE',
      ??: 'oe',
      ??: 'u',
      ??: 'u',
      ??: 'u',
      ??: 'u',
      ??: 'u',
      ??: 'y',
      ??: 'th',
      ??: 'y',
      ???: 'SS'
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should replace greek chars', function () {
    const charMap = {
      ??: 'a',
      ??: 'b',
      ??: 'g',
      ??: 'd',
      ??: 'e',
      ??: 'z',
      ??: 'h',
      ??: 'th',
      ??: 'i',
      ??: 'k',
      ??: 'l',
      ??: 'm',
      ??: 'n',
      ??: '3',
      ??: 'o',
      ??: 'p',
      ??: 'r',
      ??: 's',
      ??: 't',
      ??: 'y',
      ??: 'f',
      ??: 'x',
      ??: 'ps',
      ??: 'w',
      ??: 'a',
      ??: 'e',
      ??: 'i',
      ??: 'o',
      ??: 'y',
      ??: 'h',
      ??: 'w',
      ??: 's',
      ??: 'i',
      ??: 'y',
      ??: 'y',
      ??: 'i',
      ??: 'A',
      ??: 'B',
      ??: 'G',
      ??: 'D',
      ??: 'E',
      ??: 'Z',
      ??: 'H',
      ??: 'Th',
      ??: 'I',
      ??: 'K',
      ??: 'L',
      ??: 'M',
      ??: 'N',
      ??: '3',
      ??: 'O',
      ??: 'P',
      ??: 'R',
      ??: 'S',
      ??: 'T',
      ??: 'Y',
      ??: 'F',
      ??: 'X',
      ??: 'PS',
      ??: 'W',
      ??: 'A',
      ??: 'E',
      ??: 'I',
      ??: 'O',
      ??: 'Y',
      ??: 'H',
      ??: 'W',
      ??: 'I',
      ??: 'Y'
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should replace turkish chars', function () {
    const charMap = {
      ??: 's',
      ??: 'S',
      ??: 'i',
      ??: 'I',
      ??: 'c',
      ??: 'C',
      ??: 'u',
      ??: 'U',
      ??: 'o',
      ??: 'O',
      ??: 'g',
      ??: 'G'
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should replace cyrillic chars', function () {
    const charMap = {
      ??: 'a',
      ??: 'b',
      ??: 'v',
      ??: 'g',
      ??: 'd',
      ??: 'e',
      ??: 'yo',
      ??: 'zh',
      ??: 'z',
      ??: 'i',
      ??: 'j',
      ??: 'k',
      ??: 'l',
      ??: 'm',
      ??: 'n',
      ??: 'o',
      ??: 'p',
      ??: 'r',
      ??: 's',
      ??: 't',
      ??: 'u',
      ??: 'f',
      ??: 'h',
      ??: 'c',
      ??: 'ch',
      ??: 'sh',
      ??: 'sh',
      ??: 'u',
      ??: 'y',
      ??: '',
      ??: 'e',
      ??: 'yu',
      ??: 'ya',
      ??: 'A',
      ??: 'B',
      ??: 'V',
      ??: 'G',
      ??: 'D',
      ??: 'E',
      ??: 'Yo',
      ??: 'Zh',
      ??: 'Z',
      ??: 'I',
      ??: 'J',
      ??: 'K',
      ??: 'L',
      ??: 'M',
      ??: 'N',
      ??: 'O',
      ??: 'P',
      ??: 'R',
      ??: 'S',
      ??: 'T',
      ??: 'U',
      ??: 'F',
      ??: 'H',
      ??: 'C',
      ??: 'Ch',
      ??: 'Sh',
      ??: 'Sh',
      ??: 'U',
      ??: 'Y',
      ??: '',
      ??: 'E',
      ??: 'Yu',
      ??: 'Ya',
      ??: 'Ye',
      ??: 'I',
      ??: 'Yi',
      ??: 'G',
      ??: 'ye',
      ??: 'i',
      ??: 'yi',
      ??: 'g'
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char]
      let expected = 'foo-' + replacement.toLowerCase() + '-bar-baz'
      if (!replacement) { expected = 'foo-bar-baz' }
      assert.strictEqual(slug('foo ' + char + ' bar baz'), expected, 'replacing \'' + char + '\'')
    }
  })

  it('should replace czech chars', function () {
    const charMap = {
      ??: 'c',
      ??: 'd',
      ??: 'e',
      ??: 'n',
      ??: 'r',
      ??: 's',
      ??: 't',
      ??: 'u',
      ??: 'z',
      ??: 'C',
      ??: 'D',
      ??: 'E',
      ??: 'N',
      ??: 'R',
      ??: 'S',
      ??: 'T',
      ??: 'U',
      ??: 'Z'
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should replace slovak chars', function () {
    const charMap = {
      ??: 'a',
      ??: 'a',
      ??: 'c',
      ??: 'd',
      ??: 'e',
      ??: 'i',
      ??: 'l',
      ??: 'l',
      ??: 'n',
      ??: 'o',
      ??: 'o',
      ??: 'r',
      ??: 's',
      ??: 't',
      ??: 'u',
      ??: 'y',
      ??: 'z',
      ??: 'a',
      ??: 'A',
      ??: 'C',
      ??: 'D',
      ??: 'E',
      ??: 'I',
      ??: 'L',
      ??: 'L',
      ??: 'N',
      ??: 'O',
      ??: 'O',
      ??: 'R',
      ??: 'S',
      ??: 'T',
      ??: 'U',
      ??: 'Y',
      ??: 'Z'
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should replace polish chars', function () {
    const charMap = {
      ??: 'a',
      ??: 'c',
      ??: 'e',
      ??: 'l',
      ??: 'n',
      ??: 'o',
      ??: 's',
      ??: 'z',
      ??: 'z',
      ??: 'A',
      ??: 'C',
      ??: 'E',
      ??: 'L',
      ??: 'N',
      ??: 'S',
      ??: 'Z',
      ??: 'Z'
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should replace latvian chars', function () {
    const charMap = {
      ??: 'a',
      ??: 'c',
      ??: 'e',
      ??: 'g',
      ??: 'i',
      ??: 'k',
      ??: 'l',
      ??: 'n',
      ??: 's',
      ??: 'u',
      ??: 'z',
      ??: 'A',
      ??: 'C',
      ??: 'E',
      ??: 'G',
      ??: 'I',
      ??: 'K',
      ??: 'L',
      ??: 'N',
      ??: 'S',
      ??: 'U',
      ??: 'Z'
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should replace vietnamese chars', function () {
    const charMap = {
      ???: 'A',
      ???: 'A',
      ???: 'A',
      ???: 'A',
      ???: 'A',
      ???: 'A',
      ???: 'A',
      ???: 'A',
      ???: 'A',
      ???: 'A',
      ???: 'A',
      ???: 'A',
      ???: 'E',
      ???: 'E',
      ???: 'E',
      ???: 'E',
      ???: 'E',
      ???: 'E',
      ???: 'E',
      ???: 'E',
      ???: 'I',
      ???: 'I',
      ??: 'I',
      ???: 'O',
      ???: 'O',
      ???: 'O',
      ???: 'O',
      ???: 'O',
      ???: 'O',
      ???: 'O',
      ??: 'O',
      ???: 'O',
      ???: 'O',
      ???: 'O',
      ???: 'O',
      ???: 'O',
      ???: 'U',
      ???: 'U',
      ??: 'U',
      ??: 'U',
      ???: 'U',
      ???: 'U',
      ???: 'U',
      ???: 'U',
      ???: 'U',
      ???: 'Y',
      ???: 'Y',
      ???: 'Y',
      ???: 'Y',
      ??: 'D',
      ???: 'a',
      ???: 'a',
      ???: 'a',
      ???: 'a',
      ???: 'a',
      ???: 'a',
      ???: 'a',
      ???: 'a',
      ???: 'a',
      ???: 'a',
      ???: 'a',
      ???: 'a',
      ???: 'e',
      ???: 'e',
      ???: 'e',
      ???: 'e',
      ???: 'e',
      ???: 'e',
      ???: 'e',
      ???: 'e',
      ???: 'i',
      ???: 'i',
      ??: 'i',
      ???: 'o',
      ???: 'o',
      ???: 'o',
      ???: 'o',
      ???: 'o',
      ???: 'o',
      ???: 'o',
      ??: 'o',
      ???: 'o',
      ???: 'o',
      ???: 'o',
      ???: 'o',
      ???: 'o',
      ???: 'u',
      ???: 'u',
      ??: 'u',
      ??: 'u',
      ???: 'u',
      ???: 'u',
      ???: 'u',
      ???: 'u',
      ???: 'u',
      ???: 'y',
      ???: 'y',
      ???: 'y',
      ???: 'y',
      ??: 'd'
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should replace kazakh chars', function () {
    const charMap = {
      ??: 'AE',
      ??: 'ae',
      ??: 'GH',
      ??: 'gh',
      ??: 'KH',
      ??: 'kh',
      ??: 'NG',
      ??: 'ng',
      ??: 'UE',
      ??: 'ue',
      ??: 'U',
      ??: 'u',
      ??: 'H',
      ??: 'h',
      ??: 'OE',
      ??: 'oe'
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should replace hindi chars', function () {
    const charMap = {
      ???: 'a',
      ???: 'aa',
      ???: 'e',
      ???: 'ii',
      ???: 'ei',
      ???: 'ae',
      ???: 'ai',
      ???: 'i',
      ???: 'o',
      ???: 'oi',
      ???: 'oii',
      ???: 'uu',
      ???: 'ou',
      ???: 'u',
      ???: 'B',
      ???: 'Bha',
      ???: 'Ca',
      ???: 'Chha',
      ???: 'Da',
      ???: 'Dha',
      ???: 'Fa',
      ??????: 'Fi',
      ???: 'Ga',
      ???: 'Gha',
      ??????: 'Ghi',
      ???: 'Ha',
      ???: 'Ja',
      ???: 'Jha',
      ???: 'Ka',
      ???: 'Kha',
      ??????: 'Khi',
      ???: 'L',
      ???: 'Li',
      ???: 'Li',
      ???: 'Lii',
      ???: 'Lii',
      ???: 'Ma',
      ???: 'Na',
      ???: 'Na',
      ???: 'Nia',
      ???: 'Nae',
      ???: 'Ni',
      ???: 'oms',
      ???: 'Pa',
      ??????: 'Qi',
      ???: 'Ra',
      ???: 'Ri',
      ???: 'Ri',
      ???: 'Ri',
      ???: 'Sa',
      ???: 'Sha',
      ???: 'Shha',
      ???: 'Ta',
      ???: 'Ta',
      ???: 'Tha',
      ???: 'Tha',
      ???: 'Tha',
      ???: 'Thha',
      ??????: 'ugDha',
      ??????: 'ugDhha',
      ???: 'Va',
      ???: 'Ya',
      ??????: 'Yi',
      ??????: 'Za'
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should replace azerbaijani chars', function () {
    const charMap = {
      ??: 'c',
      ??: 'e',
      ??: 'g',
      ??: 'i',
      ??: 'o',
      ??: 's',
      ??: 'u',
      ??: 'C',
      ??: 'E',
      ??: 'G',
      ??: 'I',
      ??: 'O',
      ??: 'S',
      ??: 'U'
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should replace georgian chars', function () {
    const charMap = {
      ???: 'a',
      ???: 'b',
      ???: 'g',
      ???: 'd',
      ???: 'e',
      ???: 'v',
      ???: 'z',
      ???: 't',
      ???: 'i',
      ???: 'k',
      ???: 'l',
      ???: 'm',
      ???: 'n',
      ???: 'o',
      ???: 'p',
      ???: 'zh',
      ???: 'r',
      ???: 's',
      ???: 't',
      ???: 'u',
      ???: 'p',
      ???: 'k',
      ???: 'gh',
      ???: 'q',
      ???: 'sh',
      ???: 'ch',
      ???: 'ts',
      ???: 'dz',
      ???: 'ts',
      ???: 'ch',
      ???: 'kh',
      ???: 'j',
      ???: 'h'
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should replace bulgarian chars if locale provided', function () {
    const charMap = {
      A: 'A',
      ??: 'a',
      ??: 'B',
      ??: 'b',
      ??: 'V',
      ??: 'v',
      ??: 'G',
      ??: 'g',
      ??: 'D',
      ??: 'd',
      ??: 'E',
      ??: 'e',
      ??: 'Zh',
      ??: 'zh',
      ??: 'Z',
      ??: 'z',
      ??: 'I',
      ??: 'i',
      ??: 'Y',
      ??: 'y',
      ??: 'K',
      ??: 'k',
      ??: 'L',
      ??: 'l',
      ??: 'M',
      ??: 'm',
      ??: 'N',
      ??: 'n',
      ??: 'O',
      ??: 'o',
      ??: 'P',
      ??: 'p',
      ??: 'R',
      ??: 'r',
      ??: 'S',
      ??: 's',
      ??: 'T',
      ??: 't',
      ??: 'U',
      ??: 'u',
      ??: 'F',
      ??: 'f',
      X: 'H',
      x: 'h',
      ??: 'Ts',
      ??: 'ts',
      ??: 'Ch',
      ??: 'ch',
      ??: 'Sh',
      ??: 'sh',
      ??: 'Sht',
      ??: 'sht',
      ??: 'A',
      ??: 'a',
      ??: 'Y',
      ??: 'y',
      ??: 'Yu',
      ??: 'yu',
      ??: 'Ya',
      ??: 'ya'
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz', { locale: 'bg' }), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should replace serbian chars if locale provided', function () {
    const charMap = { ??: 'dj', ??: 'j', ??: 'lj', ??: 'nj', ??: 'c', ??: 'dz', ??: 'dj', ??: 'Dj', ??: 'j', ??: 'Lj', ??: 'Nj', ??: 'C', ??: 'Dz', ??: 'Dj', ??: 'lj', ??: 'NJ', ??: 'LJ' }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz', { locale: 'sr' }), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should replace german chars if locale provided', function () {
    const charMap = { ??: 'AE', ??: 'ae', ??: 'OE', ??: 'oe', ??: 'UE', ??: 'ue' }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz', { locale: 'de' }), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should replace ukrainian chars if locale provided', function () {
    const charMap = { ??: 'Y', ??: 'y', ??: 'Y', ??: 'y', ??: 'Ts', ??: 'ts', ??: 'Kh', ??: 'kh', ??: 'Shch', ??: 'shch', ??: 'H', ??: 'h' }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz', { locale: 'uk' }), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should honor a default locale', function () {
    assert.strictEqual(slug('D??I'), 'doi')
    slug.setLocale('de')
    assert.strictEqual(slug('D??I'), 'doei')
    slug.reset()
    assert.strictEqual(slug('D??I'), 'doi')
    // Ignores invalid locale
    slug.setLocale('fhqwhgads')
    assert.strictEqual(slug('D??I'), 'doi')
  })

  it('should remove ellipsis in pretty mode', function () {
    const charMap = {
      '???': '...'
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should strip ??? symbols in pretty mode', function () { assert.strictEqual(slug('foo ??? bar baz'), 'foo-bar-baz') })

  it('should strip symbols', function () {
    const charMap = [
      '???', '???', '???', '???', '???', '???'
    ]
    charMap.forEach(function (char) {
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-bar-baz', 'replacing \'' + char + '\'')
    })
  })

  it('should replace no unicode when disabled', function () {
    const charMap = '???????????????????????????????????????????????????????'.split('')
    charMap.forEach(function (char) {
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-bar-baz', 'replacing \'' + char + '\'')
    })
  })

  it('should allow altering the charmap', function () {
    const charmap = {
      f: 'ph', o: '0', b: '8', a: '4', r: '2', z: '5'
    }
    assert.strictEqual(slug('foo bar baz', { charmap }), 'ph00-842-845')
  })

  it('should replace lithuanian characters', function () { assert.strictEqual(slug('????????????????????????????????????'), 'aceeisuuzaceeisuuz') })

  it('should be flavourable', function () {
    const text = "It's your journey ... we guide you through."
    const expected = 'its-your-journey-we-guide-you-through'
    assert.strictEqual(slug(text, { mode: 'pretty' }), expected)
  })

  it('should default to lowercase in rfc3986 mode', function () {
    const text = "It's Your Journey We Guide You Through."
    const expected = 'its-your-journey-we-guide-you-through.'
    assert.strictEqual(slug(text, { mode: 'rfc3986' }), expected)
  })

  it('should allow disabling of lowercase', function () {
    const text = "It's Your Journey We Guide You Through."
    const expected = 'Its-Your-Journey-We-Guide-You-Through.'
    assert.strictEqual(slug(text, { mode: 'rfc3986', lower: false }), expected)
  })

  it('should replace arabic characters', function () {
    assert.strictEqual(slug('?????????? ????'), 'mrhba-bk')
    const charMap = {
      ??: 'a',
      ??: 'i',
      ??: 'b',
      ??: 't',
      ??: 'th',
      ??: 'g',
      ??: 'h',
      ??: 'kh',
      ??: 'd',
      ??: 'th',
      ??: 'r',
      ??: 'z',
      ??: 's',
      ??: 'sh',
      ??: 's',
      ??: 'd',
      ??: 't',
      ??: 'th',
      ??: 'aa',
      ??: 'gh',
      ??: 'f',
      ??: 'k',
      ??: 'k',
      ??: 'l',
      ??: 'm',
      ??: 'n',
      ??: 'h',
      ??: 'o',
      ??: 'y',
      ??: 'aa',
      ??: 'a'
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char]
      assert.strictEqual(slug('foo' + char + ' bar baz'), 'foo' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should replace zh characters', function () { assert.strictEqual(slug('??????'), '6boe5qko') })

  it('should permit replacing custom characters using .extend()', function () {
    slug.extend({ '???': 'love', '???': 'radioactive' })
    assert.strictEqual(slug('unicode ??? is ???'), 'unicode-love-is-radioactive')
  })

  it('should handle multiple code point characters with .extend()', function () {
    slug.extend({ ??????: 'fhqwhgads' })
    assert.strictEqual(slug('??????'), 'fhqwhgads')
  })

  it('consolidates repeated replacement characters from extend()', function () {
    // https://github.com/simov/slugify/issues/144
    assert.strictEqual(slug('day + night'), 'day-night')
    slug.extend({ '+': '-' })
    assert.strictEqual(slug('day + night'), 'day-night')
  })

  it('should ignore symbols if they are not in the charmap', function () {
    assert.strictEqual(slug('unicode ??? is ???'), 'unicode-is')
  })

  it('should ignore lone surrogates', function () {
    assert.strictEqual(slug(String.fromCodePoint(56714, 36991)), 'iombvw')
  })

  it('should handle a lone low surrogate by itself', function () {
    assert.strictEqual(slug(String.fromCodePoint(56714)), 'ia')
  })

  it('should handle a lone high surrogate by itself', function () {
    assert.strictEqual(slug(String.fromCodePoint(55296)), 'ia')
  })

  it('should ignore inherited properties in multicharmap', function () {
    const multicharmapPrototype = { justin: 'this-just-in' }
    function Multicharmap () {
      this.babysitter = 'dadbysitter'
    }
    Multicharmap.prototype = multicharmapPrototype

    const multicharmap = new Multicharmap()
    assert.strictEqual(multicharmap.justin, 'this-just-in')
    assert.strictEqual(slug('justin babysitter', { multicharmap }), 'justin-dadbysitter')
  })

  it('should respect the remove option', function () {
    assert.strictEqual(slug('food', { remove: /[od]/g }), 'f')
    assert.strictEqual(slug('one 1 two 2 three 3', { remove: /[0-9]/g }), 'one-two-three')
    assert.strictEqual(slug('one 1 two 2 three 3'), 'one-1-two-2-three-3')
  })

  it('should not mutate a passed options object', function () {
    const opts = {}
    slug('fhqwhgads', opts)
    assert.deepStrictEqual(opts, {})
  })

  it('should have charmaps reset by reset()', function () {
    function checkAll (expectedCharmap, expectedMulticharmap, comparison) {
      [slug, slug.defaults.modes.rfc3986, slug.defaults.modes.pretty, slug.defaults]
        .forEach(function (actual) {
          comparison(actual.charmap, expectedCharmap)
          comparison(actual.multicharmap, expectedMulticharmap)
        })
    }
    const charmap = slug.charmap
    const multicharmap = slug.multicharmap
    delete slug.charmap
    delete slug.defaults.modes.rfc3986.charmap
    delete slug.defaults.modes.pretty.charmap
    delete slug.defaults.charmap
    delete slug.multicharmap
    delete slug.defaults.modes.rfc3986.multicharmap
    delete slug.defaults.modes.pretty.multicharmap
    delete slug.defaults.multicharmap
    checkAll(undefined, undefined, assert.strictEqual)
    slug.reset()
    checkAll(charmap, multicharmap, assert.deepStrictEqual)
  })

  it('should replace hebrew', function () {
    const charMap = {
      ??: '',
      ????: 'b',
      ??: 'v',
      ????: 'g',
      ??: 'g',
      ??: 'd',
      ????: 'd',
      ??: 'h',
      ??: 'v',
      ??: 'z',
      ??: 'h',
      ??: 't',
      ??: 'y',
      ????: 'k',
      ????: 'k',
      ??: 'kh',
      ??: 'kh',
      ??: 'l',
      ??: 'm',
      ??: 'm',
      ??: 'n',
      ??: 'n',
      ??: 's',
      ??: '',
      ????: 'p',
      ??: 'f',
      ??: 'f',
      ??: 'ts',
      ??: 'ts',
      ??: 'k',
      ??: 'r',
      ????: 'sh',
      ????: 's',
      ????: 't',
      ??: 't',
      ????: 'e',
      ????: 'e',
      ????: 'a',
      ????: 'o',
      ????: 'i',
      ??????: 'i',
      ????: 'e',
      ??????: 'e',
      ????: 'e',
      ????: 'a',
      ????: 'a',
      ????: 'o',
      ????: 'o',
      ????: 'u',
      ????: 'u'
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char]
      assert.strictEqual(slug('foo' + char + ' bar baz'), 'foo' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should use base64 fallback', function () {
    assert.strictEqual(slug('=)'), 'psk')
  })

  it('should return empty result when fallback is disabled', function () {
    assert.strictEqual(slug('=(', { fallback: false }), '')
  })
})
