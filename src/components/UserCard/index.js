import React, { useState } from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { TbWorldWww } from "react-icons/tb";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

import "./index.css";
import { getAvatarUrl } from "../../utils/constant";
import { useMainContext } from "../../utils/context";
import ConfirmationModal from "../Modal/ConfirmationModal";
import FormModal from "../Modal/FormModal";

const displayArray = [
  { type: "email", Icon: AiOutlineMail },
  { type: "phone", Icon: AiOutlinePhone },
  // { type: "website", Icon: TbWorldWww },
];

let actionArray = [
  { type: "like", icon: <FcLikePlaceholder /> },
  { type: "edit", icon: <AiFillEdit color="#777" /> },
  { type: "delete", icon: <AiFillDelete color="#111" /> },
];

function UserCard({ data = {} }) {
  const { actionHandler = () => {} } = useMainContext();
  const [showEditFormModal, setShowEditFormModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { id, username, name, website, liked } = data;
  const avatarUrl = getAvatarUrl(username);

  const clickHandler = (type = "") => {
    if (type === "like") {
      actionHandler(type, { ...data, liked: liked ? false : true });
    } else {
      type === "edit"
        ? setShowEditFormModal(true)
        : setShowDeleteConfirmation(true);
    }
  };

  return (
    <>
      <div className="user-card">
        <img src={avatarUrl} alt="" className="user-avatar" />
        <div className="user-content">
          <h4>{name || username || ""}</h4>
          {displayArray.map(({ type = "", Icon = AiOutlineMail }) => (
            <div key={type} className="user-sub-content">
              <Icon color="#777" /> {data[type] || data.email}
            </div>
          ))}
          <div className="user-sub-content">
            <TbWorldWww color="#777" />
            <a href={`http://${website}`} target="_blank" rel="noreferrer">
              {website}
            </a>
          </div>
        </div>
        <div className="user-actions">
          {actionArray.map(({ type = "", icon = null }) => (
            <button key={type} onClick={() => clickHandler(type)}>
              {liked && type === "like" ? <FcLike /> : icon}
            </button>
          ))}
        </div>
      </div>
      {showEditFormModal && (
        <FormModal data={data} onClose={() => setShowEditFormModal(false)} />
      )}
      {showDeleteConfirmation && (
        <ConfirmationModal
          data={data}
          onClose={() => setShowDeleteConfirmation(false)}
        />
      )}
    </>
  );
}

export default UserCard;
