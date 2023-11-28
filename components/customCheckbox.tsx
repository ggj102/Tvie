import { HTMLProps, forwardRef } from "react";
import Image from "next/image";
import customCheckBox from "@styles/common/customCheckbox.module.scss";

interface CustomCheckboxProps extends HTMLProps<HTMLInputElement> {
  id: string;
  text?: string;
}

const CustomCheckbox = forwardRef<HTMLInputElement, CustomCheckboxProps>(
  ({ id, text, ...props }, ref) => {
    return (
      <label className={customCheckBox.custom_checkbox} htmlFor={id}>
        <input
          ref={ref}
          type="checkbox"
          id={id}
          value=""
          className={customCheckBox.input}
          {...props}
        />
        <span className={customCheckBox.checkbox_icon}>
          <Image src="/images/checkImg.png" fill sizes="1x" alt="check" />
        </span>
        <span className={customCheckBox.checkbox_text}>{text}</span>
      </label>
    );
  }
);

CustomCheckbox.displayName = "CustomCheckbox";

export default CustomCheckbox;
