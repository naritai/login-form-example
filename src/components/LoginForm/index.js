import './login.css';

const LoginForm = () => {
  return (
    <div className="login-form__container">
      <div className="login-form__caption">Sign in</div>
      <form className="login-form">
        <div className="login-form__field-group">
          <label className="login-form__label" htmlFor="email">Email</label>
          <input className="login-form__text-field" type="email" name="email" required id="email" autoFocus />
        </div>
        
        <div className="login-form__field-group">
          <label className="login-form__label" htmlFor="password">Password</label>
          <input className="login-form__text-field" type="password" name="password" required id="password" />
        </div>

        <div className="login-form__field-group">
          <div className="wrapper">
            <input className="login-form__checkbox" type="checkbox" name="remember" id="remember" />
            <label className="remember-me-label" htmlFor="remember">Remember me</label>
            <a className="forgot-password-link" href="/reset-password">Forgot password ?</a>
          </div>
        </div>

        <button className="btn submit-btn" type="submit">Sign in</button>
        <div className="register-wrapper">
          <span>New user ?</span>
          <a className="register-link" href="/register">Register</a>
        </div>
      </form>
    </div>
  )
}


export { LoginForm };