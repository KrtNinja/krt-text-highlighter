export function* getTreeNodes(tree) {
    while (tree.nextNode()) {
        yield tree.currentNode;
    }
}
export function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
