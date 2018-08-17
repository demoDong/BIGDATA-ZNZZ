import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild, NgZone } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TreeModule, TreeNode } from 'primeng/primeng';
import { DoTreeService } from 'app/shared/do-service/do-tree.service';
import { DoFrameService } from 'app/shared/do-service/do-frame.service';

@Component({
    selector: 'do-container',
    templateUrl: './do-container.component.html',
    styleUrls: ['./do-container.component.scss'],
})
export class DoContainerComponent implements OnInit {
    @Input() smallTitleTop: string = '';
    @Input() smallTitleBottom: string = '';
    @Input() showTitle = true;
    @Input() showChangeNorm_type = false;
    @Input() tabItems: Array<string>;
    @Output() btnClicked: EventEmitter<any> = new EventEmitter<any>();
    isClick: Array<boolean>;

    treeOne: TreeNode[];
    treeTwo: TreeNode[];
    treeThree: TreeNode[];
    constructor(private router: Router, private zone: NgZone, private modalService: NgbModal,
        private service: DoTreeService, private frameService: DoFrameService) {
    }

    ngOnInit() {
        if (this.tabItems) {
            this.isClick = new Array<boolean>(this.tabItems.length);
            this.isClick.fill(false);
            this.isClick[0] = true;
        }
        this.treeOne = this.service.treeContainer;
        this.treeTwo = this.service.treeContainerTwo;
        this.treeThree = this.service.treeContainerThree;
    }
    onBtnClick(i) {
        this.isClick.fill(false);
        this.isClick[i] = true;
        this.btnClicked.emit(i);
    }
    nodeSelect(event) {
        const name = event.node.label;
        if (event.node.data !== '#') {
            for (const iterator of this.service.treeContainer) {
                if (iterator.styleClass === 'activeLi') {iterator.styleClass = ''; }
                if ((iterator.label === name)) {iterator.styleClass = 'activeLi'; }
            }
            for (const iterator of this.service.treeContainerTwo) {
                if (iterator.styleClass === 'activeLi') {iterator.styleClass = ''; }
                if ((iterator.label === name)) {iterator.styleClass = 'activeLi'; }
                for (const iterator1 of iterator.children) {
                    if (iterator1.styleClass === 'activeLi') {iterator1.styleClass = ''; }
                    if ((iterator1.label === name)) {iterator1.styleClass = 'activeLi'; }
                }
            }
            for (const iterator of this.service.treeContainerThree) {
                if (iterator.styleClass === 'activeLi') {iterator.styleClass = ''; }
                if ((iterator.label === name)) {iterator.styleClass = 'activeLi'; }
                for (const iterator1 of iterator.children) {
                    if (iterator1.styleClass === 'activeLi') {iterator1.styleClass = ''; }
                    if ((iterator1.label === name)) {iterator1.styleClass = 'activeLi'; }
                }
            }
            this.service.treeNetWorkJump(event.node.data);
            this.frameService.headerController = false;
            this.frameService.headerControllerText = name;
        }
    }
}
