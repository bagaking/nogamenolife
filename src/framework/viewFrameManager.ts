// file: ./src/framework/viewFrameManager.ts
import { BrowserWindow } from 'electron';
import {ViewOptions, LayoutItem} from "./types"
import { calculateBounds } from './layout';
import {ViewFactory, View} from "./ViewFactory";


export async function initBrowserViews(win: BrowserWindow, opts: ( LayoutItem | ViewOptions )[]): Promise<View[]> {
    const views: View[] = [];
    const layouts = opts.map(x => x as LayoutItem)

    const bounds = calculateBounds(win.getBounds().width, win.getBounds().height, layouts);
    for (let i = 0; i < layouts.length; i++) {
        const option = {
            ... layouts[i],
            bound: bounds[i]
        }
        const view = await ViewFactory.Inst.CreateBrowserView(win, option)
        views.push(view);
    }

    // 当窗口尺寸改变时，重新计算并设置 BrowserView 的位置和大小
    win.on('resize', () => {
        const newBounds = calculateBounds(win.getBounds().width, win.getBounds().height, layouts);
        for (let i = 0; i < views.length; i++) {
            views[i].view.setBounds(newBounds[i]);
        }
    });

    return views;
}
