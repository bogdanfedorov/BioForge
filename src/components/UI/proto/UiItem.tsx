import { FC } from 'react';
import { ClassValue, clsx } from 'clsx';

interface IUiItemProps {
  children: React.ReactNode;
  className?: ClassValue;
}

export const UiItem: FC<IUiItemProps> = ({ children, className }) => {
  return <div className={clsx('absolute z-50', className)}>{children}</div>;
};
