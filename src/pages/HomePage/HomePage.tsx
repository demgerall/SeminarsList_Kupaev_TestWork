import React from 'react';

import { HelloSection, SeminarsSection } from '@/widgets';

import styles from './HomePage.module.scss';

export const HomePage = () => {
    return (
        <main>
            <HelloSection />
            <SeminarsSection />
        </main>
    );
};
