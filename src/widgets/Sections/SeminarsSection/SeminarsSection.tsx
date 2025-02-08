import React from 'react';
import classNames from 'classnames';
import { motion, Variants } from 'framer-motion';

import { SeminarCardsList } from '@/features';

import styles from './SeminarsSection.module.scss';

interface SeminarsSectionProps {
    className?: string;
}

export const SeminarsSection = (props: SeminarsSectionProps) => {
    const { className = '' } = props;

    const textAnimationVariants: Variants = {
        hidden: {
            x: -128,
            opacity: 0,
        },
        visible: (custom: number) => ({
            x: 0,
            opacity: 1,
            transition: { delay: custom * 0.3 },
        }),
    };

    return (
        <motion.section
            className={classNames(styles.seminarSection, [className])}
            id="seminars"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
        >
            <motion.h2
                className={styles.title}
                variants={textAnimationVariants}
                custom={4}
            >
                List of <span className={styles.title__primary}>seminars</span>
            </motion.h2>
            <SeminarCardsList />
        </motion.section>
    );
};
