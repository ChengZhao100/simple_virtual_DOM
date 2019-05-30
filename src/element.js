class Element {
  constructor(type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }
}

function createElement(type, props, children) {
  return new Element(type, props, children)
}

function render(DOMObj) {
  let el = document.createElement(DOMObj.type)
  for(let key in DOMObj.props) {
    setAttr(el, key, DOMObj.props[key])
  }
  DOMObj.children.forEach((child) => {
    child = child instanceof Element ? render(child) : document.createTextNode(child)
    el.appendChild(child)
  })
  return el
}

function setAttr(node, key, value) {
  switch(key) {
    case 'value':
      if(node.tagName.toLowerCase() === 'input' || node.tagName.toLowerCase() === 'textarea') {
        node.value = value
      } else {
        node.setAttribute(key, value)
      }
      break
    case 'style':
      node.style.cssText = value
      break
    default:
      node.setAttribute(key, value)
      break
  }
}

function renderDOM(el, target) {
  target.appendChild(el)
}

export { Element, createElement, render, setAttr, renderDOM }