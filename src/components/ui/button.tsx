import { forwardRef, type ButtonHTMLAttributes } from 'react';
import {
  buttonClassName,
  type ButtonSize,
  type ButtonVariant,
} from './button-styles';
export type { ButtonSize, ButtonVariant } from './button-styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'default', size = 'md', type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonClassName({ className, variant, size })}
      {...props}
    />
  );
});
