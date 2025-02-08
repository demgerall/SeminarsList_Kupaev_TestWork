import React from 'react';
import classNames from 'classnames';

import { seminarType } from '@/shared/libs/types';

import styles from './SeminarCard.module.scss';

interface SeminarCardProps {
    className?: string;
    seminar: seminarType;
}

export const SeminarCard = (props: SeminarCardProps) => {
    const { className = '', seminar } = props;

    const { id, title, description, date, time, photoURL } = seminar;

    return (
        <div className={classNames(styles.seminarCard, [className])}>
            <img className={styles.image} src={photoURL} draggable={false} />
            <div className={styles.textBlock}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <div className={styles.datetimeBlock}>
                    <p className={styles.datetimeBlock_date}>{date}</p>
                    <p className={styles.datetimeBlock_time}>{time}</p>
                </div>
            </div>
        </div>
    );
};
