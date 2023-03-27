import React from 'react';
export interface MenuItemProps {
    index?: string;
    className?: string;
    disabled?: boolean;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}
export declare const MenuItem: {
    ({ index, className, disabled, style, children, }: MenuItemProps): JSX.Element;
    displayName: string;
    defaultProps: {
        disabled: boolean;
    };
};
export default MenuItem;
