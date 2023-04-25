import './RememberMeCheckBoxStyles.css';

const RememberMeCheckBox = (props) => {
  const { type, className, ...rest } = props;

  return (
    <div className="field-group-checkbox">
      <input
        className={`default-checkbox ${className}`}
        type={type}
        name={type}
        id={type}
        {...rest}
      />
      <label className="label-checkbox" htmlFor={type}>Remember me</label>
    </div>
  )
};

export { RememberMeCheckBox };