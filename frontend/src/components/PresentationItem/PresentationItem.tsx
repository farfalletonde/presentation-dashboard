import React, { useState } from "react";
import "./index.css";
import { ReactComponent as Delete } from "../../public/svg/delete.svg";
import { ReactComponent as Rename } from "../../public/svg/rename.svg";
import { ReactComponent as ThreeDots } from "../../public/svg/threedots.svg";
import { IPresentation } from "src/api/useGetPresentations";
import useDeletePresentation from "src/api/useDeletePresentation";
import { Modal } from "@mui/material";
import UpdatePresentation from "../CreatePresentation/UpdatePresentation";
import moment from "moment";

interface IPresentationItemProps {
  presentation: IPresentation;
  presentationUpdated: () => void;
}

const PresentationItem = ({
  presentation,
  presentationUpdated,
}: IPresentationItemProps) => {
  const [showEditOverlay, setShowEditOverlay] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditPresentation = async () => {
    presentationUpdated();
    setShowEditOverlay(false);
  };

  const deletePresentation = useDeletePresentation();

  const handleDeletePresentation = async () => {
    await deletePresentation({ id: presentation.id });
    presentationUpdated();
    setShowEditOverlay(false);
  };

  return (
    <div className="presentationContainer">
      <div className="presentationTitleContainer">
        <p className="presentationTitle">{presentation.name}</p>
        <ThreeDots
          className="threeDots"
          onClick={() => setShowEditOverlay(true)}
        />
      </div>
      <p className="lastUpdated">
        Last update: {timeAgo(presentation.last_updated)}
      </p>

      <img
        className="presentationImage"
        src={
          presentation.image ??
          "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg"
        }
        alt="presentationImage"
      />

      <p className="presentationAuthor">by {presentation.created_by}</p>

      {showEditOverlay && (
        <div
          className="editOverlay"
          onClick={() => {
            setShowEditOverlay(false);
          }}
          role="presentation"
        >
          <ul className="editMenu">
            <li
              className="editListItem"
              onClick={(e) => {
                e.stopPropagation();
                setShowEditModal(true);
              }}
              role="presentation"
            >
              <Rename className="editIcon" />
              <span className="editText">Rename</span>
            </li>
            <li
              className="editListItem"
              onClick={handleDeletePresentation}
              role="presentation"
            >
              <Delete className="editIcon" />
              <span className="editText">Delete</span>
            </li>
          </ul>
        </div>
      )}

      <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
        <UpdatePresentation
          id={presentation.id}
          close={(isCreated) => {
            if (isCreated) {
              handleEditPresentation();
            }
            setShowEditModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

const timeAgo = (timestamp: string) => {
  const utcOffset = moment().utcOffset();
  const adjustedTimestamp = moment(timestamp).add(utcOffset, "minutes");

  return moment(adjustedTimestamp).from(moment());
};

export default PresentationItem;
