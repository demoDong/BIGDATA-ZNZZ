import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild, NgZone } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TreeModule, TreeNode } from 'primeng/primeng';
import { DoTreeService } from 'app/shared/do-service/do-tree.service';
import { DoFrameService } from 'app/shared/do-service/do-frame.service';
import * as $ from 'jquery';


@Component({
    selector: 'do-data',
    templateUrl: './do-data.component.html',
    styleUrls: ['./do-data.component.scss'],
})
export class DoDataComponent implements OnInit {
    @Input() smallTitleTop: string = '';
    @Input() smallTitleBottom: string = '';
    @Input() showTitle = true;
    @Input() showChangeNorm_type = false;
    @Input() tabItems: Array<string>;
    @Output() btnClicked: EventEmitter<any> = new EventEmitter<any>();
    isClick: Array<boolean>;

    treeClass1: boolean = true;
    treeClass3: boolean = true;
    treeClass5: boolean = true;
    treeClass7: boolean = true;
    treeClass9: boolean = true;
    treeClass11: boolean = true;
    isDisplay: any;

    macroLibraryeSelect: TreeNode[];
    regionLibrarySelect: TreeNode[];
    industryLibrarySelect: TreeNode[];
    enterpriseLibrarySelect: TreeNode[];
    ParkLibrarySelect: TreeNode[];
    internationaLibrarySelect: TreeNode[];
    productLibrarySelect: TreeNode[];
    divLength: any;
    cityArray = [
    ];
    cityValue = [
    ];
    // industryLargeData = {
    //     '年度数据': [
    //         { '工信大数据库': { '上海': 30, '北京': 20 } },
    //         { '外部委共享数据': { '深圳': 40, '贵州': 50 } },
    //         { '统计局': { '山西': 60, '天津': 70 } },
    //     ],
    // };
    industryLargeData = {
        '年度数据': {
            '工信大数据库': { '上海': 30, '北京': 20 },
            '外部委共享数据': { '深圳': 40, '贵州': 50 },
            '统计局': { '深圳': 420, '贵州': 50 },
        },
    };
    // industryStyle = [
    //     { '工信大数据库': 'class1' },
    //     { '外部委共享数据': 'class2' },
    //     { '统计局': 'class3' },
    // ];
    industryStyle = {
        '工信大数据库': 'class1',
        '外部委共享数据': 'class2',
        '统计局': 'class3',
    };
    industryLargeAll: object = {};
    classArr: Array<string> = [];
    divNameArr: Array<string> = [];
    keyArr: Array<string> = [];
    valueArr: Array<string> = [];
    informationDivHide: boolean = true;


    libraryList = [];
    categoryClass: any;
    libSelected = [];
    constructor(private router: Router, private zone: NgZone, private modalService: NgbModal,
        private service: DoTreeService, private frameService: DoFrameService) {
    }
    selectedLib(name) {
        this.divNameArr = [];
        this.classArr = [];
        this.industryLargeAll = this.industryLargeData[name];
        // tslint:disable-next-line:forin
        for (const key in this.industryLargeData[name]) {
            this.divNameArr.push(key);
            this.classArr.push(this.industryStyle[key]);
        }
    }
    industrialClicked(i) {
        this.keyArr = [];
        this.valueArr = [];
        // tslint:disable-next-line:forin
        for (const key in this.industryLargeAll[this.divNameArr[i]]) {
            this.keyArr.push(key);
            this.valueArr.push(this.industryLargeAll[this.divNameArr[i]][key]);
        }
        this.informationDivHide = false;
    }
    ngOnInit() {
        if (this.tabItems) {
            this.isClick = new Array<boolean>(this.tabItems.length);
            this.isClick.fill(false);
            this.isClick[0] = true;
        }
        this.macroLibraryeSelect = this.service.macroLibrarye;
        this.regionLibrarySelect = this.service.regionLibrary;
        this.industryLibrarySelect = this.service.industryLibrary;
        this.enterpriseLibrarySelect = this.service.enterpriseLibrary;
        this.ParkLibrarySelect = this.service.ParkLibrary;
        this.internationaLibrarySelect = this.service.internationaLibrary;
        this.productLibrarySelect = this.service.productLibrary;
    }
    onBtnClick(i) {
        this.isClick.fill(false);
        this.isClick[i] = true;
        this.btnClicked.emit(i);
    }
    nodeSelected(event) {
        const name = event.node.label;
        for (const iterator of this.service.macroLibrarye) {
            iterator.label === name ? iterator.styleClass = 'activeLi' : iterator.styleClass = '';
        }
        for (const iterator of this.service.regionLibrary) {
            iterator.label === name ? iterator.styleClass = 'activeLi' : iterator.styleClass = '';
        }
        for (const iterator of this.service.industryLibrary) {
            iterator.label === name ? iterator.styleClass = 'activeLi' : iterator.styleClass = '';
            for (const iterator1 of iterator.children) {
                iterator1.label === name ? iterator1.styleClass = 'activeLi' : iterator1.styleClass = '';
            }
        }
        for (const iterator of this.service.enterpriseLibrary) {
            iterator.label === name ? iterator.styleClass = 'activeLi' : iterator.styleClass = '';
            for (const iterator1 of iterator.children) {
                iterator1.label === name ? iterator1.styleClass = 'activeLi' : iterator1.styleClass = '';
            }
        }
        for (const iterator of this.service.ParkLibrary) {
            iterator.label === name ? iterator.styleClass = 'activeLi' : iterator.styleClass = '';
            for (const iterator1 of iterator.children) {
                iterator1.label === name ? iterator1.styleClass = 'activeLi' : iterator1.styleClass = '';
            }
        }
        for (const iterator of this.service.internationaLibrary) {
            iterator.label === name ? iterator.styleClass = 'activeLi' : iterator.styleClass = '';
        }
        for (const iterator of this.service.productLibrary) {
            iterator.label === name ? iterator.styleClass = 'activeLi' : iterator.styleClass = '';
        }
        if (event.node.data !== '#') {
            this.service.imagePath = event.node.data;
            $('#imageId').attr('src', this.service.imagePath);
        }
        // this.selectedLib(name);
    }
    // industrialClicked(i) {
    //     this.isDisplay[i] = false;
    // }
    treeShow() {
        if (this.treeClass1 === true) {
            this.treeClass1 = false;
        } else {
            this.treeClass1 = true;
        }
    }
    treeShow1() {
        if (this.treeClass3 === true) {
            this.treeClass3 = false;
        } else {
            this.treeClass3 = true;
        }
    }
    treeShow2() {
        if (this.treeClass5 === true) {
            this.treeClass5 = false;
        } else {
            this.treeClass5 = true;
        }
    }
    treeShow3() {
        $('#imageId').attr('src', 'assets/images/data10.png');
        // if (this.treeClass7 === true) {
        //     this.treeClass7 = false;
        // } else {
        //     this.treeClass7 = true;
        // }
    }
    treeShow4() {
        if (this.treeClass9 === true) {
            this.treeClass9 = false;
        } else {
            this.treeClass9 = true;
        }
    }
    treeShow5() {
        $('#imageId').attr('src', 'assets/images/data9.png');
        // if (this.treeClass11 === true) {
        //     this.treeClass11 = false;
        // } else {
        //     this.treeClass11 = true;
        // }
    }
}
