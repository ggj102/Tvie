import Image from "next/image";
import customCheckBox from "@styles/common/customCheckbox.module.scss";

export default function CustomCheckbox({ id, text, ...props }: any) {
  return (
    <label className={customCheckBox.custom_checkbox} htmlFor={id}>
      <input
        type="checkbox"
        id={id}
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
