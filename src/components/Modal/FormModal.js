import React, { useState } from "react";

import "./index.css";
import { useMainContext } from "../../utils/context";

const inputFields = ["name", "email", "phone", "website"];

function FormModal({ data = {}, onClose = () => {} }) {
  const { actionHandler = () => {} } = useMainContext();
  const [updatedData, setUpdatedData] = useState(data);

  const submitHandler = () => {
    actionHandler("edit", updatedData);
    onClose();
  };

  return (
    <div className="modal-window" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">Update User</div>
        {inputFields.map((field = "") => (
          <div key={field} className="input-container">
            <label htmlFor={field + "Field"} className="input-label">
              {field} *
            </label>
            <input
              autoFocus={field === "name"}
              type="text"
              value={updatedData[field] || ""}
              onChange={({ target: { value = "" } }) =>
                setUpdatedData({ ...updatedData, [field]: value })
              }
              placeholder={`Enter ${field} here`}
              id={field + "Field"}
              required="required"
              className="input-field"
            ></input>
          </div>
        ))}
        <div className="modal-actions">
          <button className="submit-button" onClick={submitHandler}>
            Submit
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormModal;
