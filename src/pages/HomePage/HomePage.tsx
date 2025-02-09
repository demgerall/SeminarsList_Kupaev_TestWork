import React from 'react';

import { ContactsSection, HelloSection, SeminarsSection } from '@/widgets';

import styles from './HomePage.module.scss';

export const HomePage = () => {
    return (
        <main>
            <HelloSection />
            <SeminarsSection />
            <ContactsSection />
        </main>
    );
};
