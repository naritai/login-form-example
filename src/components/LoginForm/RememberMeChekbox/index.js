import './RememberMeCheckBoxStyles.css';

const RememberMeCheckBox = (props) => {
  const { type, name, className, ...rest } = props;

  return (
    <div className="field-group-checkbox">
      <input
        className={`default-checkbox ${className}`}
        type={type}
        name={name}
        id={name}
        {...rest}
      />
      <label className="label-checkbox" htmlFor={name}>Remember me</label>
    </div>
  )
};

export { RememberMeCheckBox };