import { Component, OnInit } from '@angular/core';
import { DoContainerComponent } from '../../../shared/do-container/do-container.component';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';


@Component({
    selector: 'do-example-mf6',
    templateUrl: 'mf6.component.html',
    styleUrls: ['mf6.component.scss'],
})


export class Mf6Component implements OnInit {

    theme = 'echart-theme';
    nameMap = 'china';
    fixedChange: any;
    mapOption: any;
    pieOption2: any;
    writeOne: any;
    writeOneData: any;
    writeTwo: any;
    writeTwoData: any;
    writeThree: any;
    writeThreeData: any;


    constructor(private zone: NgZone, private router: Router, private http: HttpApi,
        private transService: DoDatatransService) {
    }
    ngOnInit() {
        this.http.get<ResponseType>('/api/22149/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                this.fixedChange = {
                    title: {
                        text: '各环节营收及增速',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    legend: [{
                        show: true,
                        data: ['设计业营收', '制造业', '封测业', '产业增速'],
                        bottom: '0%',
                        left: '0%',
                        textStyle: {
                            color: '#fff',
                        },
                    }],
                    grid: [
                        {
                            left: '15%',
                            top: '12%',
                            bottom: '20%',
                        },
                    ],
                    yAxis: [{
                        type: 'value',
                        name: '（单位：亿元）',
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
                        name: '（单位：%）',
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
                            data: result[1],
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
                            name: '设计业营收',
                            type: 'bar',
                            stack: '总量',
                            data: result[4],
                        },
                        {
                            name: '制造业',
                            type: 'bar',
                            stack: '总量',
                            data: result[3],
                        },
                        {
                            name: '封测业',
                            type: 'bar',
                            stack: '总量',
                            data: result[2],
                        },
                        {
                            name: '产业增速',
                            type: 'line',
                            yAxisIndex: 1,
                            data: result[0],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/22150/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-pie');
                this.pieOption2 = {
                    title: {
                        text: '市场结构',
                        left: 'center',
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b} : {c} ({d}%)',
                    },
                    legend: {
                        // type: 'scroll',
                        bottom: '0%',
                        data: ['海思', '紫光展锐', '中兴微电子', '华大', '智芯微', '汇顶', '士兰微', '大唐半导体', '敦泰科技', '中星微', '其他'],
                    },
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: ['40%', '60%'],
                            center: ['50%', '40%'],
                            startAngle: 270,
                            data: result,
                            label: {
                                normal: {
                                    textStyle: {
                                    },
                                },
                            },
                            labelLine: {
                                normal: {
                                    lineStyle: {
                                    },
                                },
                            },
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/22151/all')
            .subscribe(
            data => {
                this.writeOne = data.result[0].name;
                this.writeOneData = data.result[0].value;
                this.writeTwo = data.result[1].name;
                this.writeTwoData = data.result[1].value;
                this.writeThree = data.result[2].name;
                this.writeThreeData = data.result[2].value;
            },
        );
        this.http.get<ResponseType>('/api/695/query?params=type:E:0;stats_period:E:2017')
            .subscribe(
            data => {
                const scatterOne = this.transService.onObjArray(data.result, '', 'ec3-scatterMap');
                this.http.get<ResponseType>('/api/956/query?params=stats_period:E:2017')
                    .subscribe(
                    data1 => {
                        const visualTwo = this.transService.onObjArray(data1.result, '', 'ec3-visualMap');
                        this.http.get<ResponseType>('/api/695/query?params=type:E:1;stats_period:E:2017')
                        .subscribe(
                        data2 => {
                            const scatterTwo = this.transService.onObjArray(data2.result, '', 'ec3-scatterMap');
                            this.mapOption = {
                                title: {
                                    text: '',
                                    left: 'center',
                                    textStyle: {
                                        fontSize: 20,
                                    },
                                },
                                tooltip: {
                                    show: true,
                                    formatter: function (params) {
                                        return params.data[3];
                                    },
                                    trigger: 'item',
                                },
                                legend: {
                                    orient: 'vertical',
                                    bottom: '10%',
                                    left: '10%',
                                    data: [{
                                        name: '现有晶圆厂',
                                        icon: 'pin',
                                    },
                                    {
                                        name: '在建/规划晶圆厂',
                                        icon: 'pin',
                                    },
                                    ],
                                    textStyle: {
                                        // color: '#fff',
                                        fontSize: 16,
                                    },
                                },
                                visualMap: {
                                    min: 0, max: 56,
                                    calculable: true,
                                    seriesIndex: 2,
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
                                series: [
                                    {
                                        type: 'scatter',
                                        name: '现有晶圆厂',
                                        coordinateSystem: 'geo',
                                        symbol: 'pin',
                                        symbolSize: 18,
                                        itemStyle: {
                                            normal: {
                                                color: '#D6412D',
                                            },
                                        },
                                        label: {
                                            normal: { show: false },
                                            emphasis: { show: true },
                                        },
                                        data: scatterOne,
                                    },
                                    {
                                        type: 'scatter',
                                        name: '在建/规划晶圆厂',
                                        coordinateSystem: 'geo',
                                        symbol: 'pin',
                                        symbolSize: 18,
                                        itemStyle: {
                                            normal: {
                                                color: '#73CEB8',
                                            },
                                        },
                                        label: {
                                            normal: { show: false },
                                            emphasis: { show: true },
                                        },
                                        data: scatterTwo,
                                    },
                                    {
                                        type: 'map',
                                        mapType: 'china',
                                        geoIndex: 0,
                                        roam: false,
                                        label: {
                                            normal: { show: false },
                                            emphasis: { show: true },
                                        },
                                        data: visualTwo,
                                    },
                                ],
                            };
                        },
                    );
                    },
                );
            },
        );
    }
}
