import type { LayoutItem } from './types';

export type ViewBounds = {
    x: number;
    y: number;
    width: number;
    height: number;
};

const isFullWidthLayout = (layout: LayoutItem[]): boolean => {
    const totalRatio = layout.reduce((sum, item) => sum + item.ratio, 0);
    return Math.abs(totalRatio - 1) < Number.EPSILON;
};

export function calculateBounds(width: number, height: number, layout: LayoutItem[]): ViewBounds[] {
    const bounds: ViewBounds[] = [];
    let x = 0;
    const shouldFillWidth = isFullWidthLayout(layout);

    for (let i = 0; i < layout.length; i++) {
        const item = layout[i];
        const isLastItem = i === layout.length - 1;
        const viewWidth = shouldFillWidth && isLastItem
            ? width - x
            : Math.floor(width * item.ratio);

        bounds.push({ x: x, y: 0, width: viewWidth, height: height });
        x += viewWidth;
    }

    return bounds;
}
