import { Injectable } from '@angular/core';

@Injectable()
export class DoFrameService {
    headerController: boolean;
    headerControllerText: string;
    footController: Array<boolean> = new Array<boolean>(3);

    constructor() {
        this.headerController = true;
     }

    public selectIndex (idx: number, array: Array<boolean>) {
        array.fill(false);
        if (idx < array.length) {
            array[idx] = true;
        }
    }

}
