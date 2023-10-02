import { HTMLAttributes, MouseEventHandler } from 'react';
import styles from './button.module.scss';
import classNames from 'classnames';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className: string;
  children: string;
  show: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ className, children, show, onClick }: ButtonProps) => {
  const cx = classNames.bind(styles);

  return (
    <button className={cx([styles[className]])} disabled={!show} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
