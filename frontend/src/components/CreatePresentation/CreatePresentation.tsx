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
  const [file, setFile] = useState<File>();

  const showImageBrowser = () => document.getElementById("imageInput")?.click();

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const createPresentation = useCreatePresentation();

  const handlCreatePresentation = async () => {
    await createPresentation({ name: presentationName }, file);
    close(true);
  };

  return (
    <ModalBox width={420}>
      <Cross className="crossSvg" cursor="pointer" onClick={() => close()} />
      <h2 className="modalTitle">Create Presentation</h2>
      <label htmlFor="name">Presentation Name</label>

      <form onSubmit={handlCreatePresentation} className="inputForm">
        <input
          id="name"
          value={presentationName}
          onChange={(e) => setPresentationName(e.target.value)}
          required
        />

        <label id="thumbnailTitle" htmlFor="imageInput">
          Presentation Thumbnail
        </label>
        <div
          className="imageUploadContainer"
          onClick={showImageBrowser}
          role="presentation"
        >
          <Thumbnail className="thumbnailSvg" />
          <p className="uploadImageDesc">
            {file
              ? file.name
              : "Upload a picture for your presentation thumbnail. PNG or JPG (rec16:9)"}
          </p>
          <p className="browseImage">Browse</p>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleFileSelected}
          />
        </div>

        <button
          id="createButton"
          disabled={(presentationName?.trim().length ?? 0) === 0}
          type="submit"
        >
          Create
        </button>
      </form>
    </ModalBox>
  );
};

export default CreatePresentation;
