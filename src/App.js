import { useState } from "react";
import "./App.css";
import explorer from "./data/folderData";
import Folder from "./components/Folder";
import useTraversalTree from "./hooks/use-tree-traversal";

function App() {
    const [fileExplorerData, setFileExplorerData] = useState(explorer);
    const { insertNode, deleteNode, renameNode } = useTraversalTree();

    const handleInsertNode = (folderId, item, isFolder) => {
        const updatedTree = insertNode(fileExplorerData, folderId, item, isFolder);
        setFileExplorerData({...updatedTree});
    };

    const handleDeleteNode = (nodeId) => {
        const updatedTree = deleteNode(fileExplorerData, nodeId);
        setFileExplorerData({...updatedTree});
    };

    const handleRenameNode = (nodeId, newName) => {
        const updatedTree = renameNode(fileExplorerData, nodeId, newName);
        setFileExplorerData({...updatedTree});
    };

    return (
        <div className="App">
            <Folder
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleRenameNode={handleRenameNode}
                explorer={fileExplorerData}
            />
        </div>
    );
}

export default App;
