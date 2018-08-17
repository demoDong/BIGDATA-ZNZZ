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
    selector: 'do-example-mf4',
    templateUrl: 'mf4.component.html',
    styleUrls: ['mf4.component.scss'],
})


export class Mf4Component implements OnInit {
    theme = 'echart-theme';
    nameMap = 'china';
    fixedChange: any;
    moveChange: any;
    rightBottomLine: any;
    theWord: any;
    list = ['产能规划', '生产制造', '供应网络', '推广应用', '基础设施', '技术水平'];
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
    constructor(private zone: NgZone, private router: Router, private http: HttpApi,
        private transService: DoDatatransService) {
    }
    ngOnInit() {
        this.rBDisplayIs = [true, true, true, true, true, false];
        this.http.get<ResponseType>('/api/22069/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-effectScatter');
                console.log(result);
                this.fixedChange = {
                    color: '#296FDD',
                    title: {
                        text: '百公里电耗',
                        x: 'center',
                        y: 0,
                    },
                    grid: [
                        {
                            top: '10%',
                            x: '11%',
                            y: '7%',
                        },

                    ],
                    tooltip: {
                        formatter: function (obj) {
                            console.log('333');
                            console.log(obj);
                            // tslint:disable-next-line:max-line-length
                            return '车辆型号:' + obj.data[2] + '<br>电池系统能量密度（Wh/kg）:' + obj.data[1] + '<br>企业名称：' + obj.data[4] + '<br>' + obj.data[0] + '产量（量）：' + obj.data[3];
                        },
                    },
                    xAxis: [
                        {
                            gridIndex: 0, boundaryGap: true,
                            data: ['2013年', '2014年', '2015年', '2016年', '2017年'],
                            axisLabel: {
                                interval: 0,
                                rotate: 30,
                            },
                        },

                    ],
                    yAxis: [
                        {
                            gridIndex: 0,
                            name: '(单位:kwh/km)',
                            nameTextStyle: {
                                padding: [0, 0, 0, 10],
                            },
                        },
                    ],
                    series: [
                        {
                            name: 'I',
                            type: 'scatter',
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            data: result,
                            symbolSize: function (params) {
                                return params[3] / 500;
                            },
                            itemStyle: {
                                normal: {
                                    color: '#296FDD',
                                },
                            },
                            // markLine: markLineOpt
                        },

                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/22070/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-effectScatter');
                this.rightBottomLine = {
                    title: {
                        text: '电池系统能量密度',
                        x: 'center',
                        y: 0,
                    },
                    grid: [
                        {
                            top: '10%',
                            x: '10%',
                            y: '7%',
                        },

                    ],
                    tooltip: {
                        formatter: function (obj) {
                            console.log('333');
                            console.log(obj);
                            // tslint:disable-next-line:max-line-length
                            return '车辆型号:' + obj.data[2] + '<br>电池系统能量密度（Wh/kg）:' + obj.data[1] + '<br>企业名称：' + obj.data[4] + '<br>' + obj.data[0] + '产量（量）：' + obj.data[3];
                        },
                    },
                    xAxis: [
                        {
                            gridIndex: 0, data: ['2013年', '2014年', '2015年', '2016年', '2017年'], boundaryGap: true,
                            axisLabel: {
                                interval: 0,
                                rotate: 30,
                            },
                        },

                    ],
                    yAxis: [
                        { gridIndex: 0, max: 270, name: '(单位:Wh/kg)' },

                    ],
                    series: [
                        {
                            name: 'I',
                            type: 'scatter',
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            data: result,
                            symbolSize: function (params) {
                                return params[3] / 500;
                            },
                            itemStyle: {
                                normal: {
                                    color: '#296FDD',
                                },
                            },
                            markLine: {
                                symbol: 'circle',
                                tooltip: {
                                    show: false,
                                },
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
                                        fontSize: 16,
                                        formatter: '节能与新能源汽车技术路线图2020年目标',
                                    },
                                },
                                data: [
                                    { yAxis: 260 },
                                ],
                            },
                        },

                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/22071/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-effectScatter');
                this.moveChange = {
                    title: {
                        text: '续驶里程',
                        x: 'center',
                        y: 0,
                    },
                    grid: [
                        {
                            top: '15%',
                            x: '10%',
                            y: '7%',
                        },

                    ],
                    tooltip: {
                        formatter: function (obj) {
                            console.log('333');
                            console.log(obj);
                            // tslint:disable-next-line:max-line-length
                            return '车辆型号:' + obj.data[2] + '<br>电池系统能量密度（Wh/kg）:' + obj.data[1] + '<br>企业名称：' + obj.data[4] + '<br>' + obj.data[0] + '产量（量）：' + obj.data[3];
                        },
                    },
                    xAxis: [
                        {
                            gridIndex: 0, data: ['2013年', '2014年', '2015年', '2016年', '2017年'], boundaryGap: true,
                            axisLabel: {
                                interval: 0,
                                rotate: 30,
                            },
                        },

                    ],
                    yAxis: [
                        { gridIndex: 0, name: '(单位:km)' },

                    ],
                    series: [
                        {
                            name: 'I',
                            type: 'scatter',
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            data: result,
                            symbolSize: function (params) {
                                return params[3] / 500;
                            },
                            itemStyle: {
                                normal: {
                                    color: '#296FDD',
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
                                        fontSize: 16,
                                        formatter: '节能与新能源汽车技术路线图2020年目标',
                                    },
                                },
                                tooltip: {
                                    show: false,
                                },
                                data: [
                                    { yAxis: 300 },
                                ],
                            },
                        },

                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/22072/all')
            .subscribe(
            data => {
                this.theWord = data.result[0].name;
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
