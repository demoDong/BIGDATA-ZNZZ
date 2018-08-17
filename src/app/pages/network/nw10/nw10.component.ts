import { Component, OnInit } from '@angular/core';
import { DoContainerComponent } from '../../../shared/do-container/do-container.component';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { concat } from 'rxjs/operator/concat';
import { parse } from 'url';
import { last } from '@angular/router/src/utils/collection';
import { ParseSpan } from '@angular/compiler';


@Component({
    selector: 'do-example-nw10',
    templateUrl: 'nw10.component.html',
    styleUrls: ['nw10.component.scss'],
})


export class Nw10Component implements OnInit {
    theme = 'echart-theme';
    nameMap = 'china';
    fixedChange: any;
    moveChange: any;
    rightBottomLine: any;
    list: Array<string>;
    rBDisplayIs: Array<boolean>;
    displayIs: boolean = false;
    displayIsNormal: boolean = true;
    rDisplayIs: boolean = false;
    rDdisplayIsNormal: boolean = true;
    rDdisplay1IsNormal: boolean = true;
    arrowShow: Array<boolean>;

    theWord: any;
    theWord1: any;

    displayIsMove: boolean = false;
    fixedshowNormal: boolean = false;
    moveshowNormal: boolean = true;
    arrList1 = [];
    arrList2 = [];
    arrList3 = [];
    arrList4 = [];
    arrList5 = [];
    Arr = [];
    expression: Array<boolean>;
    popularRate: any;
    ThirtingFiveGoals: any;

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
                this.http.get<ResponseType>('/api/22142/query?params=type:E:' + iterator.text)
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', '');
                        iterator.arrList = result[0];
                    });
            }
            this.rBDisplayIs = [false, true, true, true, true];
            this.list = ['产业出口竞争力', '企业竞争力'];
            this.http.get<ResponseType>('/api/22052/all')
                .subscribe(
                data => {
                    const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                    this.fixedChange = {
                        title: {
                            text: '国际数字经济发展态势',
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                            },
                        },
                        legend: {
                            show: true,
                            data: ['2016年数字经济总规模', '2016年数字经济占GDP比重'],
                            bottom: '1%',
                            orient: 'horizontal',
                            textStyle: {
                                fontSize: 14,
                                color: '#fff',
                            },
                        },
                        grid: [
                            {
                                left: '20%',
                                // top: '28%'
                            },
                        ],
                        yAxis: [{
                            type: 'value',
                            name: '（单位：亿美元）',
                            splitLine: {
                                show: true,
                            },
                            axisTick: {
                                show: false,
                            },
                            barGap: 15,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            axisLabel: {
                                show: true,
                            },
                        }, {
                            type: 'value',
                            name: '（单位：%）',
                            splitLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            axisLabel: {
                                show: true,
                            },
                        }],
                        xAxis: [
                            {
                                type: 'category',
                                axisTick: {
                                    alignWithLabel: true,
                                    show: true,
                                },
                                data: result[2],
                                axisLabel: {
                                    interval: 0,
                                    rotate: 30,
                                    show: true,
                                    textStyle: {
                                        color: '#fff',
                                    },
                                },
                                splitLine: {
                                    show: false,
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#fff',
                                    },
                                },
                            },
                        ],
                        series: [
                            {
                                name: '2016年数字经济总规模',
                                type: 'bar',
                                data: result[1],
                                label: {
                                    normal: {
                                        show: false,
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: '#65FDCA',
                                            }, {
                                                offset: 1, color: '#3650BE',
                                            }],
                                        },
                                    },
                                },
                            },
                            {
                                name: '2016年数字经济占GDP比重',
                                type: 'line',
                                yAxisIndex: 1,
                                data: result[0],
                            },
                        ],
                    };
                },
            );
            this.http.get<ResponseType>('/api/22054/all')
                .subscribe(
                data => {
                    const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                    this.moveChange = {
                        title: {
                            text: '重点行业数字经济规模',
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                            },
                        },
                        // legend: [{
                        //     show: true,
                        //     data: ['设计业', '制造业', '封测业', '产业增速'],
                        //     bottom: '3%',
                        //     left: 'center',
                        //     textStyle: {
                        //         color: '#fff',
                        //     },
                        // }],
                        grid: [
                            {
                                left: '15%',
                                top: '15%',
                                height: '45%',
                            },
                        ],
                        yAxis: [{
                            type: 'value',
                            name: '(单位:亿元)',
                            splitLine: {
                                show: true,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            axisLabel: {
                                show: true,
                            },
                        }],
                        xAxis: [
                            {
                                type: 'category',
                                axisTick: {
                                    alignWithLabel: true,
                                    show: true,
                                },
                                data: result[0],
                                axisLabel: {
                                    interval: 0,
                                    rotate: 30,
                                    show: true,
                                    textStyle: {
                                        color: '#fff',
                                    },
                                },
                                splitLine: {
                                    show: false,
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#fff',
                                    },
                                },
                            },
                        ],
                        series: [
                            {
                                name: '',
                                type: 'bar',
                                data: result[2],
                                label: {
                                    normal: {
                                        show: false,
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: '#65FDCA',
                                            }, {
                                                offset: 1, color: '#3650BE',
                                            }],
                                        },
                                    },
                                },
                            },
                        ],
                    };
                },
            );
            this.http.get<ResponseType>('/api/22158/all')
                .subscribe(
                data => {
                    const result = this.transService.onObjArray(data.result, '', '');
                    console.log('我国数字经济');
                    this.rightBottomLine = {
                        title: {
                            text: '我国数字经济发展态势',
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                            },
                        },
                        legend: {
                            show: true,
                            data: ['数字经济规模', '占GDP比重'],
                            bottom: '0%',
                            orient: 'horizontal',
                            textStyle: {
                                fontSize: 14,
                                color: '#fff',
                            },
                        },
                        grid: [
                            {
                                left: '20%',
                                // top: '28%'
                            },
                        ],
                        yAxis: [{
                            type: 'value',
                            name: '（单位：亿元）',
                            splitLine: {
                                show: true,
                            },
                            axisTick: {
                                show: false,
                            },
                            barGap: 15,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            axisLabel: {
                                show: true,
                            },
                        }, {
                            type: 'value',
                            name: '（单位：%）',
                            splitLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            axisLabel: {
                                show: true,
                            },
                        }],
                        xAxis: [
                            {
                                type: 'category',
                                axisTick: {
                                    alignWithLabel: true,
                                    show: true,
                                },
                                data: result[2],
                                axisLabel: {
                                    interval: 0,
                                    rotate: 30,
                                    show: true,
                                    textStyle: {
                                        color: '#fff',
                                    },
                                },
                                splitLine: {
                                    show: false,
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#fff',
                                    },
                                },
                            },
                        ],
                        series: [
                            {
                                name: '数字经济规模',
                                type: 'bar',
                                data: result[1],
                                label: {
                                    normal: {
                                        show: false,
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: '#65FDCA',
                                            }, {
                                                offset: 1, color: '#3650BE',
                                            }],
                                        },
                                    },
                                },
                            },
                            {
                                name: '占GDP比重',
                                type: 'line',
                                yAxisIndex: 1,
                                data: result[0],
                            },
                        ],
                    };
                },
            );
            this.http.get<ResponseType>('/api/22057/all')
                .subscribe(
                data => {
                    this.theWord = data.result[0].value;
                    this.theWord1 = data.result[1].value;
                },
            );
        }
    }
    leftBtnTopClicked() {
        this.displayIs = false;
        this.displayIsNormal = true;
    }
    leftBtnTop1Clicked() {
        this.displayIs = true;
        this.displayIsNormal = false;
    }
    leftBtnBottomClicked() {
        this.rDdisplayIsNormal = true;
        this.rDisplayIs = false;
        this.rDdisplay1IsNormal = true;
    }
    leftBtnBottom1Clicked() {
        this.rDdisplayIsNormal = false;
        this.rDisplayIs = true;
        this.rDdisplay1IsNormal = true;
    }
    leftBtnBottom2Clicked() {
        this.rDdisplayIsNormal = true;
        this.rDisplayIs = true;
        this.rDdisplay1IsNormal = false;
    }
    rightBtnBottomClicked(index) {
        this.rBDisplayIs = [true, true];
        this.rBDisplayIs[index] = false;
    }
}
