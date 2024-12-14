const useTraversalTree = () => {
    const insertNode = function (tree, folderId, itemName, isFolder) {
        if (tree.id === folderId && tree.isFolder) {
            tree.items.unshift({
                id: new Date().getTime(),
                name: itemName,
                isFolder: isFolder,
                items: isFolder ? [] : null, 
            });
            return tree;
        }

        if (tree.items) {
            tree.items = tree.items.map((subtree) => insertNode(subtree, folderId, itemName, isFolder));
        }

        return tree;
    };

    const deleteNode = (tree, nodeId) => {
        if (!tree.items) return tree;

        tree.items = tree.items
            .filter((item) => item.id !== nodeId)
            .map((item) => deleteNode(item, nodeId));

        return tree;
    };

    const renameNode = (tree, nodeId, newName) => {
        if (tree.id === nodeId) {
            tree.name = newName;
            return tree;
        }

        if (tree.items) {
            tree.items = tree.items.map((subtree) => renameNode(subtree, nodeId, newName));
        }

        return tree;
    };

    return { insertNode, deleteNode, renameNode };
};

export default useTraversalTree;
