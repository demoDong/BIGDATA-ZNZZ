import { Component, OnInit } from '@angular/core';
import { DoContainerComponent } from '../../../shared/do-container/do-container.component';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { concat } from 'rxjs/operator/concat';
import { parse } from 'url';


@Component({
    selector: 'do-example-nw6',
    templateUrl: 'nw6.component.html',
    styleUrls: ['nw6.component.scss'],
})


export class Nw6Component implements OnInit {
    theme = 'echart-theme';
    nameMap = 'china';
    fixedChange: any;
    moveChange: any;
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
        this.http.get<ResponseType>('/api/20119/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                this.fixedChange = {
                    title: {
                        text: 'FTTH覆盖家庭历史变化',
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
                        name: '（单位：万个）',
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
                                        formatter: '“宽带中国”战略2020年目标',
                                    },
                                },
                                data: [
                                    { yAxis: '30000' },
                                ],
                            },
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20122/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-scatterMap');
                this.moveChange = {
                    title: {
                        text: '国家级互联网骨干直联点分布情况',
                        left: 'center',
                        top: '5%',
                        textStyle: {
                            color: 'white',
                            fontSize: 16,
                        },
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (obj) {
                            return obj.data[2];
                        },
                    },
                    legend: {
                        orient: 'vertical',
                        bottom: '28%',
                        right: '3%',
                        data: [''],
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    geo: {
                        map: 'china',
                        roam: false,
                        top: '13%',
                        zoom: 1.0,
                        layoutCenter: ['50%', '50%'],
                        label: {
                            emphasis: {
                                show: false,
                            },
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 1.5,
                                areaColor: '#071459',
                                borderColor: '#2A52AB',
                            },
                            emphasis: {
                                borderWidth: 1.5,
                            },
                        },
                    },
                    series: [{
                        type: 'scatter',
                        name: '',
                        coordinateSystem: 'geo',
                        label: {
                            normal: {
                                show: true,
                                formatter: function (obj) {
                                    return obj.data[2];
                                },
                                color: '#fff',
                                position: 'top',
                            },
                            emphasis: { show: true },
                        },
                        itemStyle: {
                            normal: {
                            },
                        },
                        data: result,
                    },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/22146/all')
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
}
