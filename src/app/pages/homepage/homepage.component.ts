import { parse } from 'url';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DoFrameService } from '../../shared/do-service/do-frame.service';
import { DoTreeService } from 'app/shared/do-service/do-tree.service';

@Component({
    selector: 'do-example-homepage',
    templateUrl: 'homepage.component.html',
    styleUrls: ['homepage.component.scss'],
})

export class HomePageComponent implements OnInit {
    overBgDisplay: boolean = true;

    constructor(private zone: NgZone,
        private router: Router,
        private frameService: DoFrameService,
        private treeService: DoTreeService) { }

    ngOnInit() {
    }

    btn1Clicked() {
        this.frameService.selectIndex(1, this.frameService.footController);
        this.router.navigate(['pages/mf5']);
        this.frameService.headerController = true;
        const name = '节能与新能源汽车';
        for (const iterator of this.treeService.treeContainer) {
            if (iterator.styleClass === 'activeLi') { iterator.styleClass = ''; }
            if ((iterator.label === name)) { iterator.styleClass = 'activeLi'; }
        }
        for (const iterator of this.treeService.treeContainerTwo) {
            if (iterator.styleClass === 'activeLi') { iterator.styleClass = ''; }
            if ((iterator.label === name)) { iterator.styleClass = 'activeLi'; }
            for (const iterator1 of iterator.children) {
                if (iterator1.styleClass === 'activeLi') { iterator1.styleClass = ''; }
                if ((iterator1.label === name)) { iterator1.styleClass = 'activeLi'; }
            }
        }
        for (const iterator of this.treeService.treeContainerThree) {
            if (iterator.styleClass === 'activeLi') { iterator.styleClass = ''; }
            if ((iterator.label === name)) { iterator.styleClass = 'activeLi'; }
            for (const iterator1 of iterator.children) {
                if (iterator1.styleClass === 'activeLi') { iterator1.styleClass = ''; }
                if ((iterator1.label === name)) { iterator1.styleClass = 'activeLi'; }
            }
        }
        this.frameService.headerController = false;
        this.frameService.headerControllerText = name;
    }
    btn2Clicked() {
        this.frameService.selectIndex(2, this.frameService.footController);
        this.router.navigate(['pages/nw4']);
        this.frameService.headerController = true;
        const name = '提速降费';
        for (const iterator of this.treeService.treeNetWork) {
            if (iterator.styleClass === 'activeLi') { iterator.styleClass = ''; }
            if ((iterator.label === name)) { iterator.styleClass = 'activeLi'; }
        }
        for (const iterator of this.treeService.treeNetWorkTwo) {
            if (iterator.styleClass === 'activeLi') { iterator.styleClass = ''; }
            if ((iterator.label === name)) { iterator.styleClass = 'activeLi'; }
        }
        this.frameService.headerController = false;
        this.frameService.headerControllerText = name;
    }
    btn3Clicked() {
        this.frameService.selectIndex(0, this.frameService.footController);
        this.router.navigate(['pages/datadecision']);
        this.frameService.headerController = true;
        this.frameService.headerController = false;
        this.frameService.headerControllerText = '工信大数据库';
    }
    startVideoClick(event) {
        if (this.overBgDisplay === true) {
            this.overBgDisplay = false;
        } else {
            event.srcElement.childNodes[1].load();
            this.overBgDisplay = true;
        }
    }
    closePage() {
        top.close();
    }
}
