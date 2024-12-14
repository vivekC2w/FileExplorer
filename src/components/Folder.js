import { useState } from "react";

function Folder({ handleInsertNode = () => {}, handleDeleteNode = () => {}, handleRenameNode = () => {}, explorer }) {
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: false,
    });

    const [renameState, setRenameState] = useState(false);

    const handleNewFolder = (e, isFolder) => {
        e.stopPropagation();
        setExpand(true);
        setShowInput({
            visible: true,
            isFolder,
        });
    };

    const addNewFolderOrFile = (e) => {
        if (e.key === "Enter" && e.target.value) {
            handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
            setShowInput({ visible: false, isFolder: false });
        }
    };

    const handleRename = (e) => {
        if (e.key === "Enter" && e.target.value) {
            handleRenameNode(explorer.id, e.target.value);
            setRenameState(false);
        }
    };

    if (explorer.isFolder) {
        return (
            <div style={{ marginTop: 5 }}>
                <div className="folder" onClick={() => setExpand(!expand)}>
                    {renameState ? (
                        <input
                            type="text"
                            defaultValue={explorer.name}
                            autoFocus
                            onKeyDown={handleRename}
                            onBlur={() => setRenameState(false)}
                        />
                    ) : (
                        <span>📁 {explorer.name}</span>
                    )}
                    <div className="action-buttons">
                        <button onClick={(e) => handleNewFolder(e, true)} className="add-folder">
                            Folder ➕
                        </button>
                        <button onClick={(e) => handleNewFolder(e, false)} className="add-file">
                            File ➕
                        </button>
                        <button onClick={(e) => handleDeleteNode(explorer.id)} className="delete-node">
                            ❌ Delete
                        </button>
                        <button onClick={(e) => setRenameState(true)} className="rename-node">
                            ✏️ Rename
                        </button>
                    </div>
                </div>

                <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
                    {showInput.visible && (
                        <div className="inputContainer">
                            <span>{showInput.isFolder ? "📁" : "📄"}</span>
                            <input
                                id={`new-${showInput.isFolder ? "folder" : "file"}-${explorer.id}`}
                                name={`new-${showInput.isFolder ? "folder" : "file"}`}
                                type="text"
                                placeholder={`Enter ${showInput.isFolder ? "folder" : "file"} name`}
                                autoFocus
                                onKeyDown={addNewFolderOrFile}
                                onBlur={() => setShowInput({ visible: false, isFolder: false })}
                                className="inputContainer_input"
                            />
                        </div>
                    )}

                    {explorer.items.map((exp) => (
                        <Folder
                            handleInsertNode={handleInsertNode}
                            handleDeleteNode={handleDeleteNode}
                            handleRenameNode={handleRenameNode}
                            explorer={exp}
                            key={exp.id}
                        />
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className="file">
                {renameState ? (
                    <input
                        type="text"
                        defaultValue={explorer.name}
                        autoFocus
                        onKeyDown={handleRename}
                        onBlur={() => setRenameState(false)} 
                        className="inputContainer_input"
                    />
                ) : (
                    <span>📄 {explorer.name}</span>
                )}
                <div className="action-buttons">
                    <button onClick={(e) => handleDeleteNode(explorer.id)} className="delete-node">
                        ❌ Delete
                    </button>
                    <button onClick={() => setRenameState(true)} className="rename-node">
                        ✏️ Rename
                    </button>
                </div>
            </div>
        );
    }
}

export default Folder;
