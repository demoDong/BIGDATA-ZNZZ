import { Component, OnInit } from '@angular/core';
import { DoContainerComponent } from '../../../shared/do-container/do-container.component';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { concat } from 'rxjs/operator/concat';
import { parse } from 'url';


@Component({
    selector: 'do-example-nw7',
    templateUrl: 'nw7.component.html',
    styleUrls: ['nw7.component.scss'],
})


export class Nw7Component implements OnInit {
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

    theWord: any;
    theWord1: any;
    theWord2: any;
    theWord3: any;

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
                this.http.get<ResponseType>('/api/22142/query?params=type:E:' + iterator.text)
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', '');
                        iterator.arrList = result[0];
                    });
            }
        }
        this.rBDisplayIs = [false, true, true, true, true];
        this.list = ['移动APP应用', '电子商务应用', '共享单车应用', '移动政务应用'];
        this.http.get<ResponseType>('/api/1129/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                this.fixedChange = {
                    title: {
                        text: '宽带普及率',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    legend: [{
                        show: true,
                        data: [''],
                        bottom: '3%',
                        left: '15%',
                        textStyle: {
                            color: '#fff',
                        },
                    }],
                    grid: [
                        {
                            left: '20%',
                            // top: '28%'
                        },
                    ],
                    yAxis: [{
                        type: 'value',
                        name: '（单位：%）',
                        min: 61,
                        max: 73,
                        gridIndex: 0,
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
                            gridIndex: 0,
                            data: result[2],
                            axisLabel: {
                                interval: '0',
                                show: true,
                                rotate: 0,
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
                            type: 'line',
                            data: result[1],
                            label: {
                                normal: {
                                    position: 'bottom',
                                },
                            },
                            markLine: {
                                symbol: 'circle',
                                lineStyle: {
                                    normal:
                                        {
                                            type: 'solid',
                                            color: '#fff',
                                        },
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'middle',
                                        formatter: '“十三五”规划目标',
                                    },
                                },
                                data: [
                                    { yAxis: result[0][0] },
                                ],
                            },
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/22147/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                this.moveChange = {
                    title: {
                        text: '移动数据资费变化趋势',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    legend: [{
                        show: true,
                        data: ['每GB数据流量费用(元)'],
                        bottom: '3%',
                        left: '0%',
                        textStyle: {
                            color: '#fff',
                        },
                    }],
                    grid: [
                        {
                            left: '15%',
                            top: '28%',
                        },
                    ],
                    yAxis: [
                        // {
                        //     type: 'value',
                        //     name: 'MB',
                        //     gridIndex: 0,
                        //     splitLine: {
                        //         show: true,
                        //     },
                        //     axisTick: {
                        //         show: false,
                        //     },
                        //     axisLine: {
                        //         show: true,
                        //         lineStyle: {
                        //             color: '#fff',
                        //         },
                        //     },
                        //     axisLabel: {
                        //         show: true,
                        //     },
                        // },
                        {
                            type: 'value',
                            name: ' (单位：元)',
                            gridIndex: 0,
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
                            gridIndex: 0,
                            data: result[2],
                            axisLael: {
                                interval: '0',
                                show: true,
                                rotate: 0,
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
                        // {
                        //     name: '月户均移动互联网流量(MB)',
                        //     type: 'line',
                        //     data: result[0],
                        // },
                        {
                            name: '每GB数据流量费用(元)',
                            type: 'line',
                            // yAxisIndex: 1,
                            data: result[1],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/22148/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                this.rightBottomLine = {
                    title: {
                        text: '',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    legend: [{
                        show: true,
                        data: ['下载规模', '应用规模'],
                        bottom: '3%',
                        left: 'center',
                        textStyle: {
                            color: '#fff',
                        },
                    }],
                    grid: [
                        {
                            left: '20%',
                            // top: '28%'
                        },
                    ],
                    yAxis: [{
                        type: 'value',
                        name: '（单位：亿次）',
                        gridIndex: 0,
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
                    }, {
                        type: 'value',
                        name: '（单位：个）',
                        gridIndex: 0,
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
                            gridIndex: 0,
                            data: result[2],
                            axisLabel: {
                                interval: '0',
                                show: true,
                                rotate: 0,
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
                            name: '下载规模',
                            type: 'bar',
                            data: result[0],
                            yAxisIndex: 0,
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
                        }, {
                            name: '应用规模',
                            type: 'line',
                            data: result[1],
                            yAxisIndex: 1,
                            label: {
                                normal: {
                                    position: 'top',
                                },
                            },
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/22073/all')
            .subscribe(
            data => {
                this.theWord = data.result[0].value;
                this.theWord1 = data.result[1].value;
                this.theWord2 = data.result[2].value;
                this.theWord3 = data.result[3].value;
            },
        );
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
    }
    leftBtnBottom1Clicked() {
        this.rDdisplayIsNormal = false;
        this.rDisplayIs = true;
    }
    rightBtnBottomClicked(index) {
        this.rBDisplayIs = [true, true, true, true, true];
        this.rBDisplayIs[index] = false;
    }
}
