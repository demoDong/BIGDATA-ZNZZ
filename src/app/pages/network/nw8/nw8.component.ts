import { Component, OnInit } from '@angular/core';
import { DoContainerComponent } from '../../../shared/do-container/do-container.component';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { concat } from 'rxjs/operator/concat';
import { parse } from 'url';


@Component({
    selector: 'do-example-nw8',
    templateUrl: 'nw8.component.html',
    styleUrls: ['nw8.component.scss'],
})


export class Nw8Component implements OnInit {
    theme = 'echart-theme';
    nameMap = 'china';
    fixedChange: any;
    moveChange: any;
    rightBottomLine: any;
    list: Array<string>;
    rBDisplayIs: Array<boolean>;
    displayIs: boolean = false;
    displayIsNormal: boolean = true;
    display1IsNormal: boolean= true;
    rDisplayIs: boolean = false;
    rDdisplayIsNormal: boolean = true;
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
            this.http.get<ResponseType>('/api/22044/all')
                .subscribe(
                data => {
                    const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                    this.fixedChange = {
                        title: {
                            text: '不同行业研发投入强度',
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                            },
                        },
                        legend: [{
                            show: true,
                            data: ['制造业', '计算机、通信和其他电子设备制造业'],
                            bottom: '2%',
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
                            gridIndex: 0,
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
                                gridIndex: 0,
                                data: result[0],
                                axisLabel: {
                                    interval: '0',
                                    show: true,
                                    rotate: 0,
                                    textStyle: {
                                        color: '#fff',
                                    },
                                },
                                splitLine: {
                                    show: true,
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
                                name: '制造业',
                                type: 'line',
                                data: result[1],
                                label: {
                                    normal: {
                                        position: 'bottom',
                                    },
                                },
                            },
                            {
                                name: '计算机、通信和其他电子设备制造业',
                                type: 'line',
                                data: result[2],
                                label: {
                                    normal: {
                                        position: 'bottom',
                                    },
                                },
                            },
                        ],
                    };
                },
            );
            this.http.get<ResponseType>('/api/22047/all')
                .subscribe(
                data => {
                    const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                    this.moveChange = {
                        title: {
                            text: '集成电路产业链各环节营收',
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                            },
                        },
                        legend: [{
                            show: true,
                            data: ['设计业', '制造业', '封测业', '产业增速'],
                            bottom: '3%',
                            left: 'center',
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
                            name: '(单位:%)',
                            min: 8,
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
                                data: result[1],
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
                            {
                                name: '设计业',
                                type: 'bar',
                                stack: 'a',
                                data: result[2],
                            },
                            {
                                name: '制造业',
                                type: 'bar',
                                stack: 'a',
                                data: result[3],
                            },
                            {
                                name: '封测业',
                                type: 'bar',
                                stack: 'a',
                                data: result[4],
                            },
                            {
                                name: '产业增速',
                                type: 'line',
                                data: result[0],
                                yAxisIndex: 1,
                            },
                        ],
                    };
                },
            );
            this.http.get<ResponseType>('/api/22050/all')
                .subscribe(
                data => {
                    const result = this.transService.onObjArray(data.result, '', 'ec3-line');
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
                            data: ['彩电', '基站', '手机'],
                            bottom: '1%',
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
                            name: '（单位：%）',
                            gridIndex: 0,
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
                                gridIndex: 0,
                                data: result[0],
                                axisLabel: {
                                    interval: '0',
                                    show: true,
                                    rotate: 0,
                                    textStyle: {
                                        color: '#fff',
                                    },
                                },
                                splitLine: {
                                    show: true,
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
                                name: '彩电',
                                type: 'line',
                                data: result[1],
                            }, {
                                name: '基站',
                                type: 'line',
                                data: result[2],
                            },
                            {
                                name: '手机',
                                type: 'line',
                                data: result[3],
                            },
                        ],
                    };
                },
            );
            this.http.get<ResponseType>('/api/22049/all')
            .subscribe(
            data => {
                console.log(data.result[0].value);
                console.log(data.result[1].value);
                this.theWord = data.result[0].value;
                this.theWord1 = data.result[1].value;
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
