import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: React.ReactNode;
    onClick: () => void;
}

export const Button = (props: ButtonProps) => {
    const { className = '', children, onClick } = props;

    return (
        <button className={classNames(styles.button, [])} onClick={onClick}>
            {children}
        </button>
    );
};
