import React, { InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';
import classNames from 'classnames';

import { FormState } from '@/entities';

import styles from './Input.module.scss';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    name: 'title' | 'description' | 'date' | 'time' | 'photo';
    label: string;
    register: UseFormRegister<FormState>;
    required?: boolean;
}

export const Input = (props: inputProps) => {
    const {
        className = '',
        name,
        label,
        register,
        required = true,
        ...otherProps
    } = props;

    return (
        <div className={classNames(styles.inputBlock, [className])}>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                className={classNames(styles.input)}
                {...register(name, { required })}
                {...otherProps}
            />
        </div>
    );
};
