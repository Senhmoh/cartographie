import React, { useState } from "react";

const EditableTitle = ({ initialTitle, onSave }) => {
  const [title, setTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  const handleSave = async () => {
    if (hasChanged) {
      await onSave(title); // Appelle la fonction de sauvegarde passée en prop
      setHasChanged(false); // Réinitialise l'état de changement
    }
    setIsEditing(false); // Désactive le mode édition
  };

  return (
    <div className="editable-title">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setHasChanged(true);
          }}
          onBlur={handleSave} // Sauvegarde lorsque l'utilisateur quitte le champ
          autoFocus
          className="editable-input"
        />
      ) : (
        <h1 className="title">
          {title}
          <i
  className="bi bi-pencil"
  onClick={() => setIsEditing(true)} // Passe en mode édition
></i>

        </h1>
      )}

      {hasChanged && (
        <i
          className="bi bi-save"
          style={{ cursor: "pointer", marginLeft: "10px" }}
          onClick={handleSave} // Sauvegarde les changements
        ></i>
      )}
    </div>
  );
};

export default EditableTitle;
