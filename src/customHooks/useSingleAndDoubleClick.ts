import { useState, useEffect } from 'react';

const delay = 200;

export const useSingleAndDoubleClick = (
    actionSingleClick: () => void,
    actionDoubleClick?: () => void,
    ) => {
        const [click, setClick] = useState(0);

        useEffect(() => {
            if (!actionDoubleClick){
                if (click === 1) {
                    actionSingleClick();
                }
                
                return;
            }

            const timer = setTimeout(() => {
                if (click === 1) {
                    actionSingleClick();
                }

                setClick(0);
            }, delay);

            if (click === 2) {
                actionDoubleClick();
            }

            return () => clearTimeout(timer);
        }, [click]);

        return () => setClick(prev => prev + 1);
}