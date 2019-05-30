import { createElement, render, renderDOM } from './element'
import diff from './diff'
import patch from './patch'

let virtualDOM1 = createElement('ul', {class: 'list'}, [
  createElement('li', {class: 'item'}, ['周杰伦']),
  createElement('li', {class: 'item'}, ['林俊杰']),
  createElement('li', {class: 'item'}, ['王力宏'])
])

console.log(virtualDOM1)

let el = render(virtualDOM1)
console.log(el)

renderDOM(el, document.getElementById('root'))

// 创建另一个新的虚拟DOM
let virtualDom2 = createElement('ul', {class: 'list-group'}, [
  createElement('li', {class: 'item active'}, ['七里香']),
  createElement('li', {class: 'item'}, ['一千年以后']),
  createElement('li', {class: 'item'}, ['需要人陪'])    
]);
// diff一下两个不同的虚拟DOM
let patches = diff(virtualDOM1, virtualDom2)
console.log(patches)

// 将变化打补丁，更新到el
patch(el, patches)
