import { Component, OnInit } from '@angular/core';
import { DoContainerComponent } from '../../../shared/do-container/do-container.component';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { concat } from 'rxjs/operator/concat';
import { parse } from 'url';


@Component({
    selector: 'do-example-nw5',
    templateUrl: 'nw5.component.html',
    styleUrls: ['nw5.component.scss'],
})


export class Nw5Component implements OnInit {
    theme = 'echart-theme';
    nameMap = 'china';
    fixedChange: any;
    moveChange: any;
    rateNumber: any;
    goalNumber: any;
    mapOption: any;
    arrowShow: Array<boolean>;

    displayIsMove: boolean = false;
    displayIs: boolean = true;
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
        this.popularRate = '2017年第三季度我国固定宽带普及率';
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
        this.http.get<ResponseType>('/api/22138/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                console.log('111');
                console.log(result);
                this.rateNumber = result[1][3];
                this.goalNumber = result[0][0];
                this.fixedChange = {
                    title: {
                        text: '固定宽带普及率历史变化情况',
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
                        left: '0%',
                        textStyle: {
                            color: '#fff',
                        },
                    }],
                    grid: [
                        {
                            left: '10%',
                            top: '28%',
                        },
                    ],
                    yAxis: [{
                        type: 'value',
                        name: '（单位：%）',
                        gridIndex: 0,
                        min: 61,
                        max: 73,
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
                                show: true,
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
                                        formatter: '“十三五”规划目标',
                                    },
                                },
                                data: [
                                    { yAxis: result[0][0] },
                                ],
                            },
                            label: {
                                normal: {
                                    position: 'right',
                                },
                            },
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/22139/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                this.moveChange = {
                    title: {
                        text: '移动宽带普及率历史变化情况',
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
                        left: '0%',
                        textStyle: {
                            color: '#fff',
                        },
                    }],
                    grid: [
                        {
                            left: '10%',
                            top: '28%',
                        },
                    ],
                    yAxis: [{
                        type: 'value',
                        name: '（单位：%）',
                        gridIndex: 0,
                        min: 71,
                        max: 85,
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
                                show: true,
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
        this.http.get<ResponseType>('/api/22140/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-visualMap');
                this.mapOption = {
                    title: {
                        text: '全国固定宽带家庭普及率地图（2017年9月）',
                        left: 'center',
                        textStyle: {
                            color: 'white',
                            fontSize: 16,
                        },
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}: {c}',
                    },
                    visualMap: {
                        min: 0, max: 105,
                        calculable: true,
                        seriesIndex: 0,
                        textGap: 20,
                        orient: 'horizontal',
                        bottom: '25%',
                        left: '0%',
                        x: '20%',
                        // inRange: {
                        //     color: [
                        //         '#f1faff',
                        //         '#017df6',
                        //     ],
                        // },
                        textStyle: {
                            color: 'white',
                        },
                    },
                    geo: {
                        map: 'china',
                        roam: false,
                        top: '10%',
                        zoom: 1,
                        layoutCenter: ['50%', '50%'],
                        label: {
                            emphasis: {
                                show: false,
                            },
                        },
                        itemStyle: {
                            normal: {
                                // areaColor: 'transparent',
                                // borderColor: '#818181',
                                borderWidth: 1.5,
                            },
                            emphasis: {
                                // areaColor: 'transparent',
                                // borderColor: '#818181',
                                borderWidth: 1.5,
                            },
                        },
                    },
                    series: [{
                        type: 'map',
                        mapType: 'china',
                        geoIndex: 0,
                        roam: false,
                        label: {
                            normal: { show: false },
                            emphasis: { show: true },
                        },
                        data: result,
                    }],
                };
            },
        );
    }
    fixedBtnClicked() {
        this.moveshowNormal = true;
        this.fixedshowNormal = false;
        this.displayIs = true;
        this.displayIsMove = false;
        this.http.get<ResponseType>('/api/22138/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                console.log('111');
                console.log(result);
                this.popularRate = '2017年第三季度我国固定宽带普及率';
                this.rateNumber = result[1][3];
                this.goalNumber = result[0][0];
            },
        );
        this.http.get<ResponseType>('/api/22140/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-visualMap');
                this.mapOption = {
                    title: {
                        text: '全国固定宽带家庭普及率地图（2017年9月）',
                        left: 'center',
                        textStyle: {
                            color: 'white',
                            fontSize: 16,
                        },
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}: {c}',
                    },
                    visualMap: {
                        min: 0, max: 105,
                        calculable: true,
                        seriesIndex: 0,
                        textGap: 20,
                        orient: 'horizontal',
                        bottom: '25%',
                        left: '0%',
                        x: '20%',
                        // inRange: {
                        //     color: [
                        //         '#f1faff',
                        //         '#017df6',
                        //     ],
                        // },
                        textStyle: {
                            color: 'white',
                        },
                    },
                    geo: {
                        map: 'china',
                        roam: false,
                        top: '10%',
                        zoom: 1,
                        layoutCenter: ['50%', '50%'],
                        label: {
                            emphasis: {
                                show: false,
                            },
                        },
                        itemStyle: {
                            normal: {
                                // areaColor: 'transparent',
                                // borderColor: '#818181',
                                borderWidth: 1.5,
                            },
                            emphasis: {
                                // areaColor: 'transparent',
                                // borderColor: '#818181',
                                borderWidth: 1.5,
                            },
                        },
                    },
                    series: [{
                        type: 'map',
                        mapType: 'china',
                        geoIndex: 0,
                        roam: false,
                        label: {
                            normal: { show: false },
                            emphasis: { show: true },
                        },
                        data: result,
                    }],
                };
            },
        );
    }
    moveBtnClicked() {
        this.fixedshowNormal = true;
        this.moveshowNormal = false;
        this.displayIs = false;
        this.displayIsMove = true;
        this.http.get<ResponseType>('/api/22139/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                console.log('222');
                console.log(result);
                this.popularRate = '2017年第三季度我国移动宽带普及率';
                this.rateNumber = result[1][3];
                this.goalNumber = result[0][0];
            },
        );
        this.http.get<ResponseType>('/api/22141/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-visualMap');
                this.mapOption = {};
                this.mapOption = {
                    title: {
                        text: '全国移动宽带家庭普及率地图（2017年9月）',
                        left: 'center',
                        textStyle: {
                            color: 'white',
                            fontSize: 16,
                        },
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}: {c}',
                    },
                    visualMap: {
                        min: 0, max: 155,
                        calculable: true,
                        seriesIndex: 0,
                        textGap: 20,
                        orient: 'horizontal',
                        bottom: '25%',
                        left: '0%',
                        x: '20%',
                        // inRange: {
                        //     color: [
                        //         '#f1faff',
                        //         '#017df6',
                        //     ],
                        // },
                        textStyle: {
                            color: 'white',
                        },
                    },
                    geo: {
                        map: 'china',
                        roam: false,
                        top: '10%',
                        zoom: 1,
                        layoutCenter: ['50%', '50%'],
                        label: {
                            emphasis: {
                                show: false,
                            },
                        },
                        itemStyle: {
                            normal: {
                                // areaColor: 'transparent',
                                // borderColor: '#818181',
                                borderWidth: 1.5,
                            },
                            emphasis: {
                                // areaColor: 'transparent',
                                // borderColor: '#818181',
                                borderWidth: 1.5,
                            },
                        },
                    },
                    series: [{
                        type: 'map',
                        mapType: 'china',
                        geoIndex: 0,
                        roam: false,
                        label: {
                            normal: { show: false },
                            emphasis: { show: true },
                        },
                        data: result,
                    }],
                };
            },
        );
    }
}
