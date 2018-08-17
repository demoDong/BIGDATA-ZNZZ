import { Component, OnInit } from '@angular/core';
import { DoContainerComponent } from '../../../shared/do-container/do-container.component';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';


@Component({
    selector: 'do-example-mf3',
    templateUrl: 'mf3.component.html',
    styleUrls: ['mf3.component.scss'],
})


export class Mf3Component implements OnInit {

    theme = 'echart-theme';
    nameMap = 'china';
    fixedChange: any;
    mapOption: any;
    zhinengOne: any;
    zhinengOneData: any;
    zhinengTwo: any;
    zhinengTwoData: any;
    zhinengThree: any;
    zhinengThreeData: any;
    zhinengFour: any;
    zhinengFourData: any;
    list: Array<string>;
    active: Array<boolean>;


    constructor(private zone: NgZone, private router: Router, private http: HttpApi,
        private transService: DoDatatransService) {
    }
    ngOnInit() {
        this.list = ['2015', '2016', '2017'];
        this.active = [false, false, true];
        this.http.get<ResponseType>('/api/22152/all')
            .subscribe(
            data => {
                this.zhinengOne = data.result[0].name;
                this.zhinengOneData = data.result[0].value;
                this.zhinengTwo = data.result[1].name;
                this.zhinengTwoData = data.result[1].value;
                this.zhinengThree = data.result[2].name;
                this.zhinengThreeData = data.result[2].value;
                this.zhinengFour = data.result[3].name;
                this.zhinengFourData = data.result[3].value;
            },
        );
        this.fixedChange = {
            title: {
                text: '智能制造专项投资',
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
                    left: '15%',
                    // top: '28%'
                },
            ],
            yAxis: [{
                type: 'value',
                name: '（单位：万元）',
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
                    data: ['2013', '2014', '2015', '2016', '2017'],
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
                    type: 'bar',
                    data: [200, 600, 400, 500, 800],
                },
            ],
        };
        this.http.get<ResponseType>('/api/22144/query?params=year:e:2017')
            .subscribe(
            data => {
                const scatterOne = this.transService.onObjArray(data.result, '', 'ec3-scatterMap');
                this.http.get<ResponseType>('/api/22145/query?params=year:e:2017')
                    .subscribe(
                    data1 => {
                        const scatterTwo = this.transService.onObjArray(data1.result, '', 'ec3-scatterMap');
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
                                    name: '智能制造专项',
                                    icon: 'pin',
                                },
                                {
                                    name: '智能制造试点示范项目',
                                    icon: 'pin',
                                },
                                ],
                                textStyle: {
                                    // color: '#fff',
                                    fontSize: 16,
                                },
                            },
                            geo: {
                                map: 'china',
                                roam: false,
                                top: '10%',
                                zoom: 1.2,
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
                            series: [
                                {
                                    type: 'scatter',
                                    name: '智能制造专项',
                                    coordinateSystem: 'geo',
                                    symbol: 'pin',
                                    symbolSize: 18,
                                    itemStyle: {
                                        normal: {
                                            color: '#9e2838',
                                        },
                                    },
                                    label: {
                                        normal: { show: false },
                                        emphasis: { show: true },
                                    },
                                    data: scatterTwo,
                                },
                                {
                                    type: 'scatter',
                                    name: '智能制造试点示范项目',
                                    coordinateSystem: 'geo',
                                    symbol: 'pin',
                                    symbolSize: 18,
                                    itemStyle: {
                                        normal: {
                                            color: '#6ecebd',
                                        },
                                    },
                                    label: {
                                        normal: { show: false },
                                        emphasis: { show: true },
                                    },
                                    data: scatterOne,
                                },
                            ],
                        };
                    },
                );
            },
        );
    }
    rightBtnClicked(item, index) {
        this.active.fill(false);
        this.active[index] = true;
        this.http.get<ResponseType>('/api/22144/query?params=year:e:' + item)
            .subscribe(
            data => {
                const scatterOne = this.transService.onObjArray(data.result, '', 'ec3-scatterMap');
                this.http.get<ResponseType>('/api/22145/query?params=year:e:' + item)
                    .subscribe(
                    data1 => {
                        const scatterTwo = this.transService.onObjArray(data1.result, '', 'ec3-scatterMap');
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
                                    name: '智能制造专项',
                                    icon: 'pin',
                                },
                                {
                                    name: '智能制造试点示范项目',
                                    icon: 'pin',
                                },
                                ],
                                textStyle: {
                                    // color: '#fff',
                                    fontSize: 16,
                                },
                            },
                            geo: {
                                map: 'china',
                                roam: false,
                                top: '10%',
                                zoom: 1.2,
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
                            series: [
                                {
                                    type: 'scatter',
                                    name: '智能制造专项',
                                    coordinateSystem: 'geo',
                                    symbol: 'pin',
                                    symbolSize: 18,
                                    itemStyle: {
                                        normal: {
                                            color: '#9e2838',
                                        },
                                    },
                                    label: {
                                        normal: { show: false },
                                        emphasis: { show: true },
                                    },
                                    data: scatterTwo,
                                },
                                {
                                    type: 'scatter',
                                    name: '智能制造试点示范项目',
                                    coordinateSystem: 'geo',
                                    symbol: 'pin',
                                    symbolSize: 18,
                                    itemStyle: {
                                        normal: {
                                            color: '#6ecebd',
                                        },
                                    },
                                    label: {
                                        normal: { show: false },
                                        emphasis: { show: true },
                                    },
                                    data: scatterOne,
                                },
                            ],
                        };
                    },
                );
            },
        );
    }
}
