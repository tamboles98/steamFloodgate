import { SubmitButton } from "../SubmitButton";
import "./SteamIdForm.css";

type handleSubmitType = (e: React.SubmitEvent<HTMLFormElement>) => void;

export const SteamIdForm = ({
  submitHandler,
}: {
  submitHandler: handleSubmitType;
}) => {
  return (
    <form className="steamIdForm" onSubmit={(e) => submitHandler(e)}>
      <input
        className="steamIdInput"
        type="text"
        name="steamId"
        placeholder="Steam ID"
      />
      <SubmitButton text="Enviar" />
    </form>
  );
};
