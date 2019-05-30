// in patch.js

import { Element, render, setAttr } from './element'

let allPatches, index = 0

function patch(node, patches) {
  allPatches = patches

  // 给某个元素打补丁
  walk(node)
}

function walk(node) {
  let currentPatch = allPatches[index++]
  if(currentPatch) {
    doPatch(node, currentPatch)
  }

  // 先序深度，继续遍历递归子节点
  node.childNodes && node.childNodes.forEach((child) => {
    walk(child) // 打上补丁
  })
}

function doPatch(node, patches) {
  // 遍历所有打过的补丁,patches是个对象
  patches.forEach((patch) => {
    switch(patch.type){
      case 'ATTR':
        for(let key in patch.attr) {
          if(patch.attr[key]) {
            setAttr(node, key, patch.attr[key])
          } else {
            node.removeAttribute(key)
          }
        }
        break
      case 'TEXT':
        node.textContent = patch.text
        break
      case 'REPLACE':
        let newNode = patch.newNode
        newNode = newNode instanceof Element ? render(newNode) : document.createTextNode(newNode)
        node.parentNode.replaceChild(newNode, node)
        break
      case 'REMOVE':
        node.parentNode.removeChild(node)
        break
      default:
        break
    }
  })
}

export default patch
