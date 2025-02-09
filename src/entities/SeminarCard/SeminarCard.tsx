import React, { useState } from 'react';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';

import { deleteSeminarById } from '@/features';
import { Button } from '@/shared/ui/Buttons';
import { useAppDispatch } from '@/shared/libs/hooks';
import { seminarType } from '@/shared/libs/types';

import DeleteIcon from '@/shared/assets/icons/delete.svg';
import EditIcon from '@/shared/assets/icons/edit.svg';

import styles from './SeminarCard.module.scss';

interface SeminarCardProps {
    className?: string;
    seminar: seminarType;
}

export const SeminarCard = (props: SeminarCardProps) => {
    const { className = '', seminar } = props;

    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const { id, title, description, date, time, photoURL } = seminar;

    const dispatch = useAppDispatch();

    const deleteCard = (id: number) => {
        dispatch(deleteSeminarById(id));
    };

    return (
        <div className={classNames(styles.seminarCard, [className])}>
            <div className={styles.imageBlock} draggable={false}>
                {!isImageLoaded ? (
                    <Skeleton
                        style={{
                            borderRadius: 32,
                            transition: 'all 0.3s ease-in-out',
                        }}
                        width={'100%'}
                        height={300}
                        baseColor="var(--skeleton-base-color)"
                        highlightColor="var(--skeleton-highlight-color)"
                    />
                ) : (
                    ''
                )}
                <img
                    src={photoURL}
                    className={styles.image}
                    alt="Image of seminar"
                    style={isImageLoaded ? {} : { display: 'none' }}
                    onLoad={() => setIsImageLoaded(true)}
                    draggable={false}
                />
            </div>
            <div className={styles.textBlock}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <div className={styles.datetimeBlock}>
                    <p className={styles.datetimeBlock_date}>{date}</p>
                    <p className={styles.datetimeBlock_time}>{time}</p>
                </div>
            </div>
            <div className={styles.buttonsBlock}>
                <Button
                    onClick={() => {
                        deleteCard(id);
                    }}
                >
                    <DeleteIcon />
                </Button>
                <Button onClick={() => {}}>
                    <EditIcon />
                </Button>
            </div>
        </div>
    );
};
