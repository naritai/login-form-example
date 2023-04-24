import { useState, useEffect, useRef } from 'react';
import { EyeSlash, Eye } from './icons';
import './login.css';

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
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [state, setState] = useState(FORM_STATES.filling);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setState(FORM_STATES.filling);
  }, [email, password]);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

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

  return (
    <section className="login-form__container">
      <h1 className="login-form__caption">Sign in</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <p 
          className={showError ? "error-message" : "offscreen"}
          ref={errRef}
          aria-live="assertive"
        >
            {errorMsg}
        </p>

        <div className="login-form__field-group">
          <label className="login-form__label" htmlFor="email">Email</label>
          <input
            className={`login-form__text-field ${showError ? 'error' : ''}`}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            ref={emailRef}
            type="email"
            name="email"
            autoComplete="off"
            required
          />
        </div>
        
        <div className="login-form__field-group">
          <label className="login-form__label" htmlFor="password">Password</label>
          <div className="password-field__wrapper">
            <input
              className={`login-form__text-field ${showError ? 'error' : ''}`}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
            />
            {password && (
              <button
                className="toggle-password-visibility"
                onClick={toggleShowPassword}
                type="button"
                tabindex="-1"
              >
                {showPassword ? <EyeSlash /> :  <Eye /> }
              </button>
            )}
          </div>
        </div>

        <div className="login-form__field-group">
          <div className="wrapper">
            <input
              className="login-form__checkbox"
              onChange={(e) => setRemember(!!e.target.checked)}
              value={remember}
              type="checkbox"
              name="remember"
              id="remember"
            />
            <label className="remember-me-label" htmlFor="remember">Remember me</label>
            <a className="forgot-password-link" href="/reset-password">Forgot password ?</a>
          </div>
        </div>

        <button
          className="btn submit-btn"
          type="submit"
          disabled={state === FORM_STATES.sending}
        >
          {state === FORM_STATES.sending ? 'processing...': 'Sign in'}
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