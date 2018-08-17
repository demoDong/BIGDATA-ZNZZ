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
    selector: 'do-example-nw9',
    templateUrl: 'nw9.component.html',
    styleUrls: ['nw9.component.scss'],
})


export class Nw9Component implements OnInit {
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
    display1IsNormal: boolean = true;
    arrowShow: Array<boolean>;

    theWord: any;
    theWord1: any;
    theWord2: any;

    displayIsMove: boolean = false;
    fixedshowNormal: boolean = false;
    moveshowNormal: boolean = true;
    arrList1 = [];
    arrList2 = [];
    arrList3 = [];
    arrList4 = [];
    arrList5 = [];
    Arr = [];
    liList = [];
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
            this.http.get<ResponseType>('/api/22059/all')
                .subscribe(
                data => {
                    const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                    this.fixedChange = {
                        title: {
                            text: '漏洞数量前十省份',
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                            },
                        },
                        // legend: {
                        //     show: true,
                        //     data: ['2016年数字经济总规模', '2016年数字经济占GDP比重'],
                        //     bottom: '1%',
                        //     orient: 'horizontal',
                        //     textStyle: {
                        //         fontSize: 14,
                        //         color: '#fff',
                        //     },
                        // },
                        grid: [
                            {
                                left: '20%',
                                // top: '28%'
                            },
                        ],
                        yAxis: [{
                            type: 'value',
                            name: '（单位：万个）',
                            splitLine: {
                                show: true,
                            },
                            axisTick: {
                                show: false,
                            },
                            barGap: 15,
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
                                data: result[1],
                            }],
                    };
                },
            );
            this.http.get<ResponseType>('/api/22060/all')
                .subscribe(
                data => {
                    const result = this.transService.onObjArray(data.result, '', 'ec3-pie');
                    this.moveChange = {
                        title: {
                            text: '我国工控系统暴漏问题的设备厂商',
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b}: {c} ({d}%)',
                        },
                        legend: {
                            orient: 'vertical',
                            right: '0%',
                            top: '20%',
                            height: '50%',
                            data: result,
                            align: 'left',
                        },
                        series: [
                            {
                                name: '来源',
                                center: ['25%', '50%'],
                                type: 'pie',
                                radius: ['50%', '70%'],
                                avoidLabelOverlap: false,
                                label: {
                                    normal: {
                                        show: false,
                                        position: 'center',
                                    },
                                    emphasis: {
                                        show: true,
                                        textStyle: {
                                            fontSize: '30',
                                            fontWeight: 'bold',
                                        },
                                    },
                                },
                                labelLine: {
                                    normal: {
                                        show: false,
                                    },
                                },
                                data: result,
                            },
                        ],
                    };
                },
            );
            this.http.get<ResponseType>('/api/22062/all')
                .subscribe(
                data => {
                    const result = this.transService.onObjArray(data.result, '', 'ec3-visualMap');
                    this.rightBottomLine = {
                        title: {
                            text: '网络信息安全总体趋势', left: 'center',
                            textStyle: {
                                fontSize: 20,
                            },
                        },
                        tooltip: {
                            show: true,
                            formatter: function (params) {
                                console.log(params);
                                return params.data.name;
                            },
                            trigger: 'item',
                        },
                        visualMap: {
                            min: 0, max: 100, calculable: true,
                            seriesIndex: 0,
                            textGap: 20,
                            orient: 'horizontal',
                            show: false,
                        },
                        geo: {
                            map: 'china',
                            roam: false,
                            top: '15%',
                            left: '15%',
                            zoom: 1.1,
                            layoutCenter: ['50%', '50%'],
                            label: {
                                normal: { show: true },
                                emphasis: {
                                    show: true,
                                },
                            },
                            itemStyle: {
                            },
                        },
                        series: [{
                            type: 'map',
                            mapType: 'china',
                            geoIndex: 0,
                            label: {
                                normal: { show: true },
                                emphasis: { show: true },
                            },
                            data: result,
                        }],
                    };
                },
            );
            this.http.get<ResponseType>('/api/22061/all')
                .subscribe(
                data => {
                    this.theWord = data.result[0].value;
                    this.theWord1 = data.result[1].value;
                    this.theWord2 = data.result[2].value;
                },
            );
            this.http.get<ResponseType>('/api/22063/all')
                .subscribe(
                data => {
                    console.log(data.result);
                    this.liList = data.result;
                },
            );
        }
    }
    leftBtnTopClicked() {
        this.displayIs = false;
        this.displayIsNormal = true;
        this.display1IsNormal = true;
    }
    leftBtnTop1Clicked() {
        this.displayIs = true;
        this.displayIsNormal = false;
        this.display1IsNormal = true;
    }
    leftBtnTop2Clicked() {
        this.displayIs = true;
        this.displayIsNormal = true;
        this.display1IsNormal = false;
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
        this.rBDisplayIs = [true, true];
        this.rBDisplayIs[index] = false;
    }
}
