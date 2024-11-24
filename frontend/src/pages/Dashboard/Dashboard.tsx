import React, { useCallback, useEffect, useState } from "react";
import "./index.css";
import { ReactComponent as Plus } from "../../public/svg/plus.svg";
import { ReactComponent as Stars } from "../../public/svg/stars.svg";
import Navbar from "src/components/Navbar/Navbar";
import useGetPresentations, {
  IPresentation,
} from "src/api/useGetPresentations";
import { Modal } from "@mui/material";
import CreatePresentation from "src/components/CreatePresentation/CreatePresentation";
import CreateWithAI from "src/components/CreatePresentation/CreateWithAI";
import PresentationItem from "src/components/PresentationItem/PresentationItem";

const Dashboard = () => {
  const [presentations, setPresentations] = useState<IPresentation[]>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateAIModal, setShowCreateAIModal] = useState(false);

  const presentationsApi = useGetPresentations();

  const loadPresentations = useCallback(async () => {
    const result = await presentationsApi();
    setPresentations(result);
  }, [presentationsApi]);

  useEffect(() => {
    loadPresentations();
  }, [loadPresentations]);
  return (
    <div>
      <Navbar />

      <div className="dashboardContainer">
        <h2 className="dashboardTitle">Create a presentation</h2>

        <div className="createContainer">
          <div
            className="createButton"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="plusSvg" />
            <p className="newPresentation">Create a new presentation</p>
          </div>
          <div
            className="createButton createWithAi"
            onClick={() => setShowCreateAIModal(true)}
          >
            <Stars className="starsSvg" />
            <p className="createWithAitTitle">Create with AI</p>
          </div>
        </div>

        {(presentations?.length ?? 0) > -1 && (
          <div>
            <h2 className="dashboardTitle">Decks</h2>
            <p className="dashboardLabel">8 files</p>

            <div className="createContainer">
              {presentations?.map((item) => (
                <PresentationItem presentation={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal open={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <CreatePresentation
          close={(isCreated) => {
            if (isCreated) {
              loadPresentations();
            }
            setShowCreateModal(false);
          }}
        />
      </Modal>

      <Modal
        open={showCreateAIModal}
        onClose={() => setShowCreateAIModal(false)}
      >
        <CreateWithAI
          close={(isCreated) => {
            if (isCreated) {
              loadPresentations();
            }
            setShowCreateAIModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
