var expect = require('chai').expect
  , client = require('utilise.client')
  , owner  = require('utilise.owner')
  , attr   = require('./')
  , el 

describe('attr', function() {
  
  before(function(){
    /* istanbul ignore else */
    if (!client) return el = require("jsdom")
      .jsdom('<div key="value">')
      .defaultView
      .document
      .body
      .firstElementChild

    /* istanbul ignore next */
    el = document.body.appendChild(document.createElement('div'))
    /* istanbul ignore next */
    el.setAttribute('key', 'value')
  })

  it('should get value of attribute', function() {
    expect(attr(el, 'key')).to.equal('value')
  })

  it('should set value of attribute', function() {
    expect(attr(el, 'foo', 'bar')).to.equal('bar')
    expect(attr(el, 'foo')).to.equal('bar')
  })

  it('should set value of attribute', function() {
    attr('foo', 'baz')(el)
    expect(attr(el, 'foo')).to.equal('baz')
  })

  it('should work with lists', function() {
    var input = [el, el]
      , result = input.map(attr('key'))

    expect(result).to.eql(['value', 'value'])
  })

  it('should work with d3 selections', function() {
    var fn = function(){ return el }
      , d3 = { node: fn }

    expect(attr(d3, 'key')).to.eql('value')
  })

  it('should not coerce to empty string if value not set', function() {
    expect(attr(el, 'baz')).to.eql(null)
  })

  it('should remove an attribute', function() {
    attr(el, 'baz', 'yes')
    expect(attr(el, 'baz')).to.eql('yes')
    attr(el, 'baz', false)
    expect(attr(el, 'baz')).to.eql(null)
  })

  it('should work curried', function() {
    expect(attr('key')(el)).to.eql('value')
    expect(attr('key').call(el)).to.eql('value')
  })

  it('should work with shadow roots', function() {
    var root = el.ownerDocument.createElement('div')
    root.host = el  
    expect(attr('key')(root)).to.eql('value')
    expect(attr('key').call(root)).to.eql('value')
    expect(attr('key', 'foo')(root)).to.eql('foo')
    expect(attr('key')(el)).to.eql('foo')
  })

  it('should never confuse with window', function() {
    owner.node = true
    var root = el.ownerDocument.createElement('div')
    expect(attr('key', 'foo')(root)).to.eql('foo')
    expect(attr('key')(root)).to.eql('foo')
    expect(attr('key', 'bar').call(root)).to.eql('bar')
    expect(attr('key').call(root)).to.eql('bar')
  })

})