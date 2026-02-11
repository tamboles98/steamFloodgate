import "./ErrorWindow.css";

export const ErrorWindow = ({ message }: { message: string }) => {
  return (
    <article>
      <p className="ErrorMessage">
        <strong>{message}</strong>
      </p>
    </article>
  );
};
