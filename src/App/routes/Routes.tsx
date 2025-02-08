import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { HomePage } from '@/pages';
import { ROUTES } from '@/shared/routes/routes';

export const AppRoutes = () => {
    return (
        <Suspense>
            <Routes>
                <Route path={ROUTES.HOME} index element={<HomePage />} />
            </Routes>
        </Suspense>
    );
};
