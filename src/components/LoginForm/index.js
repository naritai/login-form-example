import { useState, useEffect, useRef, useCallback } from 'react';
import { PasswordField } from './PasswordField';
import { EmailField } from './EmailField';
import { ErrorMessage } from './ErrorMessage';
import { RememberMeCheckBox } from './RememberMeChekbox';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { SUCCESS_RESPONSE, FAILURE_RESPONSE } from './stubs';
import './LoginFormStyles.css';

const FORM_STATES = {
  filling: 'filling',
  sending: 'sending',
  success: 'success',
  failure: 'failure'
}

const defaultFormData = {
  email: '',
  password: '',
  remember: false,
  state: FORM_STATES.filling
};

const LoginForm = () => {
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const emailRef = useRef(null);
  const errRef = useRef(null);
  const [formData, setFormData] = useState(defaultFormData);
  const [formState, setFormState] = useState(FORM_STATES.filling);
  const [errorMsg, setErrorMsg] = useState('');

  const updateFormData = (key, value) => {
    setFormData((prevState) => ({ ...prevState, [key]: value }));
  }

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  }, []);

  const handleCheck = useCallback((e) => {
    const { name, checked } = e.target;
    updateFormData(name, !!checked);
  }, []);


  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setFormState(FORM_STATES.filling);
  }, [formState.email, formState.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState(FORM_STATES.sending);
    console.log('formData', formData);

    // setTimeout(() => {
    //   setAuth({ user: 'Aleksandr' });
    //   setFormData(defaultFormData);
    //   setFormState(FORM_STATES.success);
    //   navigate(from, { replace: true });
    // }, 1000)

    try {
      const { email, password, remember } = formState;
      const data = JSON.stringify({ email, password, remember });
      const response = (Math.random() * 1 > 0.5) ? SUCCESS_RESPONSE : FAILURE_RESPONSE;
      // const response = await fetch('', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   credentials: 'include',
      //   body: data
      // });

      if (response.status === 'success') {
        setAuth({ user: response.data.user });
        setFormData(defaultFormData);
        setFormState(FORM_STATES.success);
        navigate(from, { replace: true });
      }

      if (response?.error) {
        setErrorMsg(response.data?.error);
        errRef.current.focus();
      }
    } catch (err) {
      setFormState(FORM_STATES.failure);
      setErrorMsg(err.message);
      errRef.current.focus();
    }
  }

  const showError = formState !== FORM_STATES.filling && errorMsg;
  const disableSubmit = formState === FORM_STATES.sending;

  return (
    <section className="login-form__container">
      <h1 className="login-form__caption">Sign in</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <ErrorMessage showError={showError} errorMessage={errorMsg} ref={errRef} />

        <EmailField
          className={showError ? 'error' : ''}
          ref={emailRef}
          value={formData.email}
          onChange={handleChange}
          controlSelection={false}
          type="email"
          autoCorrect="off"
          spellCheck="false"
          required
          autoComplete="username"
        />

        <PasswordField
          className={showError ? 'error' : ''}
          value={formData.password}
          onChange={handleChange}
          controlSelection={true}
          type="password"
          required
          autoCorrect="off"
          spellCheck="false"
          autoComplete="current-password"
        />

        <div className="field-group-wrapper">
          <RememberMeCheckBox 
            value={formData.remember}
            onChange={handleCheck}
            type="checkbox"
            name="remember"
          />
          <Link className="forgot-password-link" to="/restore-password">Forgot password ?</Link>
        </div>
        

        <button className="btn submit-btn" type="submit" disabled={disableSubmit}>
          {disableSubmit ? 'processing...': 'Sign in'}
        </button>

        <div className="register-wrapper">
          <span>New user ?</span>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </section>
  )
}


export { LoginForm };