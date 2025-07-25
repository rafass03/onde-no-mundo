// src/components/ErrorMessage.jsx

const ErrorMessage = ({ message }) => {
  return (
    <div className="border-t border-white mt-6 pt-6 text-center">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
