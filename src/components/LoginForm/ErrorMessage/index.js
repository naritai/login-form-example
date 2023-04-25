import { forwardRef } from "react";
import './ErrorMessageStyles.css';

const ErrorMessage = forwardRef((props, ref) => {
  const { showError, errorMessage, ...rest } = props;
  return (
    <p 
      className={showError ? "error-message" : "offscreen"}
      ref={ref}
      aria-live="assertive"
      {...rest}
    >
        {errorMessage}
    </p>
  )
});

export { ErrorMessage };