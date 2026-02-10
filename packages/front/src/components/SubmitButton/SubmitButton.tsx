import "./SubmitButton.css";

export const SubmitButton = ({ text }: { text: string }) => {
  return (
    <button className="submitButton" type="submit">
      {text}
    </button>
  );
};
