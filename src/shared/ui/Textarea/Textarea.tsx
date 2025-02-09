import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import classNames from 'classnames';

import { FormState } from '@/entities';

import styles from './Textarea.module.scss';

interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    name: 'title' | 'description' | 'date' | 'time' | 'photo';
    label: string;
    register: UseFormRegister<FormState>;
    required?: boolean;
}

export const Textarea = (props: TextareaProps) => {
    const {
        className = '',
        name,
        label,
        register,
        required = true,
        ...otherProps
    } = props;

    return (
        <div className={classNames(styles.textareaBlock, [className])}>
            <label htmlFor={name}>{label}</label>
            <textarea
                id={name}
                className={classNames(styles.textarea)}
                {...register(name, { required })}
                {...otherProps}
            />
        </div>
    );
};
