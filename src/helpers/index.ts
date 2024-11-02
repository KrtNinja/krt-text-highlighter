export function* getTreeNodes(tree: TreeWalker) {
  while (tree.nextNode()) {
    yield tree.currentNode
  }
}

export function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
