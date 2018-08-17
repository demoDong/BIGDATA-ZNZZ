import { Component, OnInit } from '@angular/core';
import { DoContainerComponent } from '../../../shared/do-container/do-container.component';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { concat } from 'rxjs/operator/concat';
import { parse } from 'url';
interface IndexTables {
    ranking?;
    country?;
    numericalValue?;
}
@Component({
    selector: 'do-example-nw1',
    templateUrl: 'nw1.component.html',
    styleUrls: ['nw1.component.scss'],
})
export class Nw1Component implements OnInit {
    theme = 'echart-theme';
    rightRadia = {};
    firstLadder: any;
    colorHidden: Array<boolean>;
    TwoLadder: any;
    firstEchelon = [];
    secondEchelon = [];
    thirdEchelon = [];
    colorHiddenOne = [];
    colorHiddenTwo = [];
    colorHiddenThree = [];
    ThreeLadder: any;
    arrowShow: Array<boolean>;

    arrList1 = [];
    arrList2 = [];
    arrList3 = [];
    arrList4 = [];
    arrList5 = [];
    Arr = [];
    expression: Array<boolean>;

    indexTable: IndexTables[];

    constructor(private zone: NgZone, private router: Router, private http: HttpApi,
        private transService: DoDatatransService) {
        this.Arr = [
            { picName: '1', text: '部内', arrList: this.arrList1 },
            { picName: '2', text: '外部委', arrList: this.arrList2 },
            { picName: '3', text: '地方', arrList: this.arrList3 },
            { picName: '4', text: '企业', arrList: this.arrList4 },
            { picName: '5', text: '第三方机构', arrList: this.arrList5 },
        ];
    }
    onClick(index) {
        this.arrowShow.fill(true);
        if (this.expression[index] === true) {
            this.expression[index] = false;
            this.arrowShow[index] = true;
        } else {
            this.expression.fill(false);
            this.expression[index] = true;
            this.arrowShow[index] = false;
        }
    }
    ngOnInit() {
        this.indexTable = [
            { ranking: 1, country: '123', numericalValue: '123' },
        ];
        this.chartLegendselected({ name: '技术产业' });
        if (this.Arr) {
            this.expression = new Array<boolean>(this.Arr.length);
            this.expression.fill(false);
            this.arrowShow = new Array<boolean>(this.Arr.length);
            this.arrowShow.fill(true);
            for (const iterator of this.Arr) {
                this.arrowShow.fill(true);
                this.http.get<ResponseType>('/api/22142/query?params=type:E:' + iterator.text)
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', '');
                        iterator.arrList = result[0];
                    });
            }
        }
        this.http.get<ResponseType>('/api/22100/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-radia');
                this.rightRadia = {
                    title: {
                        text: '',
                        top: '0',
                    },
                    tooltip: {
                    },
                    legend: {
                        data: result[0].legend,
                        left: '50%',
                        bottom: '8%',
                        selectedMode: 'single',
                    },
                    radar: {
                        indicator: result[0].indicator,
                        radius: '80%',
                        center: [
                            '25%',
                            '50%',
                        ],
                    },
                    series: [
                        {
                            type: 'radar',
                            data: result[0].data,
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/1119/query?params=name:E:第一梯队')
            .subscribe(
            data => {
                const result = data.result;
                this.firstLadder = result[0].name + ':';
                // tslint:disable-next-line:forin
                for (const i in result) {
                    if (result[i].val === '美国') {
                        this.colorHiddenOne.push(true);
                    } else {
                        this.colorHiddenOne.push(false);
                    }
                    // tslint:disable-next-line:radix
                    if (parseInt(i) === result.length - 1) {
                        this.firstEchelon.push(result[i].val);
                    } else {
                        // tslint:disable-next-line:no-unused-expression
                        this.firstEchelon.push(result[i].val) + ',';
                    }
                    // tslint:disable-next-line:no-unused-expression
                }
            },
        );
        this.http.get<ResponseType>('/api/1119/query?params=name:E:第二梯队')
            .subscribe(
            data => {
                const result = data.result;
                this.TwoLadder = result[0].name + ':';
                // tslint:disable-next-line:forin
                for (const key in result) {
                    if (result[key].val === '中国') {
                        this.colorHiddenTwo.push(true);
                    } else {
                        this.colorHiddenTwo.push(false);
                    }
                    // tslint:disable-next-line:radix
                    if (parseInt(key) === result.length - 1) {
                        this.secondEchelon.push(result[key].val);
                    } else {
                        this.secondEchelon.push(result[key].val + ',');
                    }
                }
            },
        );
        this.http.get<ResponseType>('/api/1119/query?params=name:E:第三梯队')
            .subscribe(
            data => {
                const result = data.result;
                this.ThreeLadder = result[0].name + ':';
                // tslint:disable-next-line:forin
                for (const key in result) {
                    // tslint:disable-next-line:radix
                    if (parseInt(key) === result.length - 1) {
                        this.thirdEchelon.push(result[key].val);
                    } else {
                        this.thirdEchelon.push(result[key].val + ',');
                    }
                }
            },
        );
    }
    chartLegendselected(obj) {
        this.http.get<ResponseType>('/api/22074/query?params=L1:E:' + obj.name)
            .subscribe(
            data => {
                const tempTables = new Array<IndexTables>();
                const result = this.transService.onObjArray(data.result, '', '');
                // tslint:disable-next-line:forin
                for (const key in result[0]) {
                    tempTables.push({
                        // tslint:disable-next-line:radix
                        ranking: result[4][key],
                        country: result[1][key],
                        numericalValue: result[2][key],
                    });
                }
                this.zone.run(() => this.indexTable = [...tempTables]);
            });
    }
}
class IndexTable implements IndexTables {
    constructor(public ranking?, public country?, public numericalValue?) { }
}
