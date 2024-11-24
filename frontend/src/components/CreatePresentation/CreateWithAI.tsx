import React, { useState } from "react";
import ModalBox from "../ModalBox/ModalBox";
import { ReactComponent as Cross } from "../../public/svg/cross.svg";
import "./index.css";
import useCreatePresentation from "src/api/useCreatePresentation";

interface ICreateModalProps {
  close: (isCreated?: boolean) => void;
}

const CreateWithAI = ({ close }: ICreateModalProps) => {
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const createPresentation = useCreatePresentation();

  const handleCreateWithAi = async () => {
    await createPresentation({ name: aiPrompt });
    close(true);
  };

  return (
    <ModalBox width={708}>
      <Cross className="crossSvg" cursor="pointer" onClick={close} />
      <label id="aiPromptLabel">What’s your presentation about? </label>
      <input
        id="name"
        value={aiPrompt}
        onChange={(e) => setAiPrompt(e.target.value)}
        required
      />

      <button
        id="letsStartButton"
        disabled={(aiPrompt?.trim().length ?? 0) === 0}
        onClick={handleCreateWithAi}
      >
        Let's Start
      </button>
    </ModalBox>
  );
};

export default CreateWithAI;
