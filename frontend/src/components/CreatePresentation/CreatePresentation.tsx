import React, { useState } from "react";
import ModalBox from "../ModalBox/ModalBox";
import { ReactComponent as Cross } from "../../public/svg/cross.svg";
import { ReactComponent as Thumbnail } from "../../public/svg/thumbnail.svg";
import "./index.css";
import useCreatePresentation from "src/api/useCreatePresentation";

interface ICreateModalProps {
  close: (isCreated?: boolean) => void;
}

const CreatePresentation = ({ close }: ICreateModalProps) => {
  const [presentationName, setPresentationName] = useState<string>("");

  const createPresentation = useCreatePresentation();

  const handlCreatePresentation = async () => {
    await createPresentation({ name: presentationName });
    close(true);
  };

  return (
    <ModalBox width={420}>
      <Cross className="crossSvg" cursor="pointer" onClick={close} />
      <h2 className="modalTitle">Create Presentation</h2>
      <label htmlFor="name">Presentation Name</label>
      <input
        id="name"
        value={presentationName}
        onChange={(e) => setPresentationName(e.target.value)}
        required
      />

      <label id="thumbnailTitle">Presentation Thumbnail</label>
      <div className="imageUploadContainer">
        <Thumbnail className="thumbnailSvg" />
        <p className="uploadImageDesc">
          Upload a picture for your presentation thumbnail. PNG or JPG (rec
          16:9)
        </p>
        <p className="browseImage">Browse</p>
      </div>

      <button
        id="createButton"
        disabled={(presentationName?.trim().length ?? 0) === 0}
        onClick={handlCreatePresentation}
      >
        Create
      </button>
    </ModalBox>
  );
};

export default CreatePresentation;
