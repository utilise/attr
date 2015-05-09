var is = require('is')

module.exports = function attr(d, name, value) {
  d = d.node ? d.node() : d
  if (is.str(d)) return function(el){ return attr(el, d) }

  return arguments.length > 2 ? d.setAttribute(name, value)
       : d.attributes.getNamedItem(name)
      && d.attributes.getNamedItem(name).value
}
