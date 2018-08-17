import { Component, OnInit } from '@angular/core';
import { DoContainerComponent } from '../../../shared/do-container/do-container.component';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { concat } from 'rxjs/operator/concat';
import { parse } from 'url';
import { TreeModule } from 'primeng/primeng';
import { min } from 'rxjs/operator/min';


@Component({
    selector: 'do-example-mf8',
    templateUrl: 'mf8.component.html',
    styleUrls: ['mf8.component.scss'],
})


export class Mf8Component implements OnInit {
    theme = 'echart-theme';
    nameMap = 'china';
    fixedChange: any;
    moveChange: any;
    rightBottomLine: any;
    theWord: any;
    dataAll = [
        [
            [10.0, 8.04],
            [8.0, 6.95],
            [13.0, 7.58],
            [9.0, 8.81],
            [11.0, 8.33],
            [14.0, 9.96],
            [6.0, 7.24],
            [4.0, 4.26],
            [12.0, 10.84],
            [7.0, 4.82],
            [5.0, 5.68],
        ],
    ];
    rBDisplayIs: Array<boolean>;
    arrList1 = [];
    arrList2 = [];
    arrList3 = [];
    arrList4 = [];
    arrList5 = [];
    Arr = [];
    arrowShow: Array<boolean>;

    expression: Array<boolean>;
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
        this.rBDisplayIs = [true, true, true, true, true, false];
        this.http.get<ResponseType>('/api/20004/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                console.log(result);
                this.fixedChange = {
                    title: {
                        text: '前 10',
                        left: 'center',
                        top: '5%',
                        textStyle: {
                            color: 'white',
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '0%',
                        containLabel: true,
                    },
                    xAxis: {
                        show: false,
                        type: 'value',
                        axisLine: { show: false },
                        splitLine: { show: false },
                    },
                    yAxis: {
                        type: 'category',
                        axisLine: { show: false },
                        splitLine: { show: false },
                        data: result[1],
                        axisLabel: {
                            color: 'white',
                            rotate: 0,
                        },
                    },
                    series: [
                        {
                            type: 'bar',
                            data: result[0],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20001/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.rightBottomLine = {
                    tooltip: { trigger: 'axis' },
                    textStyle: {
                        color: 'white',
                    },
                    legend: {
                        bottom: '9%',
                        data: ['工业增加值增速', '年度均值'],
                        textStyle: {
                            color: 'white',
                        },
                    },
                    grid: {
                        left: '3%', top: '10%',
                        right: '4%', bottom: '15%',
                        containLabel: true,
                    },
                    dataZoom: [
                        {
                            show: true,
                            realtime: true,
                            start: 80,
                            end: 100,
                            height: 20,
                            textStyle: {
                                color: '#fff',
                            },
                        },
                    ],
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            rotate: 30,
                        },
                        data: result[2],
                    },
                    yAxis: {
                        type: 'value',
                        scale: true,
                        axisTick: {
                            show: false,
                        },
                        name: '(单位：%)',
                    },
                    series: [{
                        name: '工业增加值增速',
                        type: 'line',
                        data: result[1],
                    }, {
                        name: '年度均值',
                        type: 'line',
                        data: result[0],
                    },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20005/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.moveChange = {
                    title: {
                        text: '后 10',
                        left: 'center',
                        top: '5%',
                        textStyle: {
                            color: 'white',
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '5%',
                        containLabel: true,
                    },
                    xAxis: {
                        type: 'value',
                        show: false,
                        axisLine: { show: false },
                        splitLine: { show: false },
                        position: 'buttom',
                    },
                    yAxis: {
                        type: 'category',
                        axisLine: { show: false },
                        splitLine: { show: false },
                        position: 'right',
                        data: result[1],
                        axisLabel: {
                            color: 'white',
                            rotate: 0,
                        },
                    },
                    series: [
                        {
                            type: 'bar',
                            data: result[0],
                        },
                    ],
                };
            },
        );
    }
    rightBtnBottomClicked(index) {
        this.rBDisplayIs = [true, true, true, true, true, true];
        this.rBDisplayIs[index] = false;
        if (index === 1) {
            this.zone.run(() => this.router.navigate(['pages/mf5']));
        }
    }
}
