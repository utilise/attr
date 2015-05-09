var expect = require('chai').expect
  , attr   = require('./')
  , el     = require("jsdom").jsdom('<div key="value">').defaultView.document.body.firstElementChild

describe('attr', function() {
  
  it('should get value of attribute', function() {
    expect(attr(el, 'key')).to.equal('value')
  })

  it('should set value of attribute', function() {
    attr(el, 'foo', 'bar')
    expect(attr(el, 'foo')).to.equal('bar')
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

})