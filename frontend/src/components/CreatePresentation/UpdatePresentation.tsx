import React, { useState } from "react";
import ModalBox from "../ModalBox/ModalBox";
import { ReactComponent as Cross } from "../../public/svg/cross.svg";
import "./index.css";
import useUpdatePresentation from "src/api/useUpdatePresentation";

interface IUpdatePresentationProps {
  id: number;
  close: (isCreated?: boolean) => void;
}

const UpdatePresentation = ({ id, close }: IUpdatePresentationProps) => {
  const [presentationName, setPresentationName] = useState<string>("");

  const updatePresentation = useUpdatePresentation();

  const handlUpdatePresentation = async () => {
    await updatePresentation({ id, name: presentationName });
    close(true);
  };

  return (
    <ModalBox width={420}>
      <Cross className="crossSvg" cursor="pointer" onClick={() => close()} />
      <h2 className="modalTitle">Update Presentation</h2>
      <label htmlFor="name">Presentation Name</label>
      <input
        id="name"
        value={presentationName}
        onChange={(e) => setPresentationName(e.target.value)}
        required
      />

      <button
        id="createButton"
        disabled={(presentationName?.trim().length ?? 0) === 0}
        onClick={handlUpdatePresentation}
      >
        Update
      </button>
    </ModalBox>
  );
};

export default UpdatePresentation;
