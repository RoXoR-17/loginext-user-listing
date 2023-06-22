import React from "react";
import { useMainContext } from "../../utils/context";

import "./index.css";

function ConfirmationModal({ data = {}, onClose = () => {} }) {
  const { actionHandler = () => {} } = useMainContext();

  const submitHandler = () => {
    actionHandler("delete", { ...data, deleted: true });
    onClose();
  };

  return (
    <div className="modal-window" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">Delete User</div>
        <p className="modal-text">Are you sure to delete the user ?</p>
        <div className="modal-actions">
          <button className="submit-button" onClick={submitHandler}>
            Yes, Delete
          </button>
          <button className="cancel-button" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
