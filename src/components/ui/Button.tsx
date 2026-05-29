import type { ButtonHTMLAttributes } from 'react';

type Variant = 'gold' | 'outline' | 'dark';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

const CLASS_MAP: Record<Variant, string> = {
  gold: 'btn-gold',
  outline: 'btn-outline',
  dark: 'btn-dark',
};

export function Button({ variant = 'gold', fullWidth, className = '', children, ...props }: ButtonProps) {
  const cls = [CLASS_MAP[variant], fullWidth ? 'w-full' : '', className].filter(Boolean).join(' ');
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
