import { useState, useRef } from 'react';
import { EyeSlash, Eye } from '../icons';
import { ControlledInput } from '../../ControlledInput';
import './PasswordFieldStyles.css';

const warningMessage = 'Show password as a plain text. Warning: your password will be seen on the screen';

const PasswordField = (props) => {
  const { type, value, className, ...rest } = props;

  const passRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [capslockOn, setCapslockOn] = useState(false);


  const togglePassVisibility = (e) => {
    setShowPassword((prev) => !prev);
    passRef.current.focus();
  };

  const handlePassKeyDown = (e) => {
    const capslock = e?.getModifierState('CapsLock');
    setCapslockOn(capslock);
  }

  return (
    <div className="field-group">
      <label className={`label ${capslockOn ? 'warning' : ''}`} htmlFor={type}>
        {capslockOn ? 'Password: caps lock is enabled!' : 'Password'}
      </label>

      <div className="field-wrapper">
        <ControlledInput
          className={`default-password-field ${className}`}
          ref={passRef}
          type={showPassword ? 'text' : type}
          value={value}
          onKeyDown={handlePassKeyDown}
          {...rest}
        />

        {value && (
          <button
            className="toggle-password-visibility"
            onClick={togglePassVisibility}
            type="button"
            aria-label={warningMessage}
            tabIndex="-1"
          >
            {showPassword ? <EyeSlash /> :  <Eye /> }
          </button>
        )}
      </div>
    </div>
  )
}

export { PasswordField };