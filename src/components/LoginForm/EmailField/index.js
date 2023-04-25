import { forwardRef  } from "react";
import { ControlledInput } from "../../ControlledInput"

const EmailField = forwardRef((props, ref) => {
  const { type, value, ...rest } = props;

  return (
    <div className="field-group">
      <label className="label" htmlFor={type}>Email</label>
      <ControlledInput
        ref={ref}
        type={type}
        value={value}
        {...rest}
      />
    </div>
  )
});

export { EmailField };