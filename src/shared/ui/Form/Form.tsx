import React, { FormHTMLAttributes } from 'react';

import styles from './Form.module.scss';
import classNames from 'classnames';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    className?: string;
    children: React.ReactNode;
    onSubmit: () => {};
}

export const Form = (props: FormProps) => {
    const { className = '', children, onSubmit } = props;

    return (
        <form
            className={classNames(styles.form, [className])}
            onSubmit={onSubmit}
        >
            {children}
        </form>
    );
};
