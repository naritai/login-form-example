import { useRef, forwardRef } from 'react';
import './ControlledInputStyles.css';

const ControlledInput = forwardRef((props, ref) => {
   const { value, type, onFocus, className, controlSelection, ...rest } = props;
   const customRef = useRef(null);
   const resolvedRef = ref ?? customRef;

   const handleCursorPosition = (e) => {
      onFocus && onFocus(e);
      const input = resolvedRef.current;
      if (input) {
         setTimeout(() => {
            const len = String(value).length;
            input.setSelectionRange(len, len);
         }, 0);
       }
   }

   return (
      <input
         className={`default-input ${className}`}
         ref={resolvedRef}
         value={value}
         type={type}
         name={type}
         id={type}
         onFocus={controlSelection ? handleCursorPosition : onFocus}
         {...rest}
      />
   );
});

export { ControlledInput };