import { useState, useEffect } from 'react';

const delay = 200;

export const useSingleAndDoubleClick = (
    actionSingleClick: () => void,
    actionControlClick?: () => void,
    actionDoubleClick?: () => void,
    ) => {
        const [click, setClick] = useState(0);

        useEffect(() => {
            const timer = setTimeout(() => {
                if (click === 1) {
                    actionSingleClick();
                }

                setClick(0);
            }, delay);

            if (click === 2) {
                actionDoubleClick?.();
            }

            return () => clearTimeout(timer);
        }, [click]);

        const onClick = (e: React.MouseEvent) => {
            if (!!actionControlClick && e.ctrlKey){
                actionControlClick();
                return;
            }

            if (!actionDoubleClick){
                actionSingleClick();
                return;
            }

            setClick(prev => prev + 1);
        }

        return onClick;
}