import React, { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import classNames from 'classnames';

import { getSeminars } from '@/features';
import { SeminarCard } from '@/entities';
import { useAppDispatch, useAppSelector } from '@/shared/libs/hooks';

import styles from './SeminarCardsList.module.scss';

interface SeminarCardsListProps {
    className?: string;
}

export const SeminarCardsList = (props: SeminarCardsListProps) => {
    const { className = '' } = props;

    const dispatch = useAppDispatch();

    const { seminars, isLoading } = useAppSelector(({ seminars }) => seminars);

    useEffect(() => {
        dispatch(getSeminars());
    }, [dispatch]);

    console.log(seminars);

    const cardAnimationVariants: Variants = {
        hidden: {
            y: 32,
            opacity: 0,
        },
        visible: (custom: number) => ({
            y: 0,
            opacity: 1,
            transition: { delay: custom * 0.3 },
        }),
    };

    return (
        <motion.ul
            className={classNames(styles.seminarCardsList, [className])}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
        >
            {seminars.map((seminar, index) => {
                return (
                    <motion.li
                        key={index}
                        variants={cardAnimationVariants}
                        custom={index + 1}
                    >
                        <SeminarCard seminar={seminar} />
                    </motion.li>
                );
            })}
        </motion.ul>
    );
};
