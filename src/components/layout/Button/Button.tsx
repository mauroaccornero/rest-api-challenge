import "./button.css";
import React from "react";

interface IButtonProps {
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  label: string;
  disabled?: boolean;
  styleClasses?: string[];
  testId?: string
}

const Button = ({
  handleClick,
  label,
  disabled = false,
  styleClasses = [],
  testId = 'button-test-id'
}: IButtonProps) => {
  const buttonClasses = ["button", ...styleClasses].join(" ");

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={(e) => handleClick(e)}
      disabled={disabled}
      data-testid={testId}
    >
      {label}
    </button>
  );
};

export default Button;
