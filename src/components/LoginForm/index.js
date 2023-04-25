import { useState, useEffect, useRef } from 'react';
import { PasswordField } from './PasswordField';
import { EmailField } from './EmailField';
import { ErrorMessage } from './ErrorMessage';
import { RememberMeCheckBox } from './RememberMeChekbox';
import './LoginFormStyles.css';

const FORM_STATES = {
  filling: 'filling',
  sending: 'sending',
  sent: 'sent'
}

const LoginForm = () => {
  const emailRef = useRef(null);
  const errRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [state, setState] = useState(FORM_STATES.filling);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setState(FORM_STATES.filling);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState(FORM_STATES.sending);

    try {
      const data = JSON.stringify({ email, password, remember });
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'credentials': 'include'
        },
        body: data
      });
      setState(FORM_STATES.sent);

      if (response.status === 'success') {
        // redirect
        return;
      }

      if (response.data?.error) {
        setErrorMsg(response.data?.error);
        errRef.current.focus();
      }
    } catch (err) {
      setState(FORM_STATES.sent);
      setErrorMsg(err.message);
      errRef.current.focus();
    }
  }

  const showError = state !== FORM_STATES.filling && errorMsg;
  const disableSubmit = state === FORM_STATES.sending;

  return (
    <section className="login-form__container">
      <h1 className="login-form__caption">Sign in</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <ErrorMessage showError={showError} errorMessage={errorMsg} ref={errRef} />

        <EmailField
          className={showError ? 'error' : ''}
          ref={emailRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          controlSelection={false}
          type="email"
          autoCorrect="off"
          spellCheck="false"
          required
          autoComplete="username"
        />

        <PasswordField
          className={showError ? 'error' : ''}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          controlSelection={true}
          type="password"
          required
          autoCorrect="off"
          spellCheck="false"
          autoComplete="current-password"
        />

        <div className="field-group-wrapper">
          <RememberMeCheckBox 
            value={remember}
            onChange={(e) => setRemember(!!e.target.checked)}
            type="checkbox"
          />
          <a className="forgot-password-link" href="/reset-password">Forgot password ?</a>
        </div>
        

        <button className="btn submit-btn" type="submit" disabled={disableSubmit}>
          {disableSubmit ? 'processing...': 'Sign in'}
        </button>

        <div className="register-wrapper">
          <span>New user ?</span>
          <a className="register-link" href="/register">Register</a>
        </div>
      </form>
    </section>
  )
}


export { LoginForm };