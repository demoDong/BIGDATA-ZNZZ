import { Component, OnInit } from '@angular/core';
import { DoContainerComponent } from '../../../shared/do-container/do-container.component';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';


@Component({
    selector: 'do-example-nw2',
    templateUrl: 'nw2.component.html',
    styleUrls: ['nw2.component.scss'],
})


export class Nw2Component implements OnInit {
    nw2Option1: any;
    nw2Option2: any;
    nw2Option3: any;
    theWord: any;
    theWord1: any;
    theWord2: any;
    arrowShow: Array<boolean>;


    arrList1 = [];
    arrList2 = [];
    arrList3 = [];
    arrList4 = [];
    arrList5 = [];
    Arr = [];
    expression: Array<boolean>;

    theme = 'echart-theme';

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
        this.http.get<ResponseType>('/api/22028/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.nw2Option1 = {
                    title: {
                        text: 'FTTH覆盖家庭历史变化',
                        left: 'center',
                        textStyle: {
                            fontSize: 20,
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '20%',
                        containLabel: true,
                    },
                    legend: {
                        show: true,
                        // data: ['贵州工业增加值增速(%)', '全国工业增加值增速(%)'],
                        bottom: '10%',
                        left: 'center',
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: result[2],
                            axisTick: {
                                alignWithLabel: true,
                                show: true,
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '(单位:万个)',
                            scale: true,
                            max: 120000,
                            min: 20000,
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
                            barWidth: '40%',
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
                                        formatter: '‘宽带中国’战略2020年目标',
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
        this.http.get<ResponseType>('/api/22029/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.nw2Option2 = {
                    title: {
                        text: '4G基站历史变化',
                        left: 'center',
                        textStyle: {
                            fontSize: 20,
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '20%',
                        containLabel: true,
                    },
                    legend: {
                        show: true,
                        // data: ['贵州工业增加值增速(%)', '全国工业增加值增速(%)'],
                        bottom: '10%',
                        left: 'center',
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: result[0],
                            axisTick: {
                                alignWithLabel: true,
                                show: true,
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            axisLine: {
                                // show: true,
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '(单位:万个)',
                            splitLine: {
                                show: true,
                            },
                            axisLine: {
                                show: false,
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
                            barWidth: '40%',
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
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/22030/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-visualMap');
                this.http.get<ResponseType>('/api/22030/query?params=value:E:1')
                    .subscribe(
                    data1 => {
                        const scatter = this.transService.onObjArray(data1.result, '', 'ec3-scatterMap');
                        this.http.get<ResponseType>('/api/22030/query?params=value:E:2')
                            .subscribe(
                            data2 => {
                                const scatter2 = this.transService.onObjArray(data2.result, '', 'ec3-scatterMap');
                                this.http.get<ResponseType>('/api/22030/query?params=value:E:3')
                                    .subscribe(
                                    data3 => {
                                        const scatter3 = this.transService.onObjArray(data3.result, '',
                                            'ec3-scatterMap');
                                        this.nw2Option3 = {
                                            color: ['#296FDD', '#65feca', '#e33f2e'],
                                            title: {
                                                text: '全国电信普遍服务试点城市地图', left: 'center',
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
                                            // visualMap: {
                                            //    // min: 0, max: 100, calculable: true,
                                            //     seriesIndex: 0,
                                            //     textGap: 20,
                                            //     orient: 'horizontal',
                                            //     bottom: '6%',
                                            //     // inRange: {
                                            //     //     color: [
                                            //     //         '#f9faff',
                                            //     //         '#017df6',
                                            //     //     ],
                                            //     // },
                                            //     textStyle: {
                                            //         color: 'white',
                                            //     },
                                            // },
                                            legend: {
                                                orient: 'vertical',
                                                bottom: '10%',
                                                left: '10%',
                                                data: [{
                                                    name: '第一批次电信普遍服务试点城市',
                                                    icon: 'pin',
                                                },
                                                {
                                                    name: '第二批次电信普遍服务试点城市',
                                                    icon: 'pin',
                                                },
                                                {
                                                    name: '第三批次电信普遍服务试点城市',
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
                                                zoom: 1,
                                                layoutCenter: ['50%', '50%'],
                                                label: {
                                                    emphasis: {
                                                        show: false,
                                                    },
                                                },
                                                itemStyle: {
                                                    normal: {
                                                        areaColor: '#0A1C64',
                                                        borderColor: '#215ABA',
                                                        borderWidth: 1.5,
                                                    },
                                                    emphasis: {
                                                        areaColor: '#0A1C64',
                                                        borderColor: '#215ABA',
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
                                            },
                                            {
                                                type: 'scatter',
                                                name: '第一批次电信普遍服务试点城市',
                                                coordinateSystem: 'geo',
                                                symbol: 'pin',
                                                symbolSize: 18,
                                                label: {
                                                    normal: { show: false },
                                                    emphasis: { show: true },
                                                },
                                                itemStyle: {
                                                    normal: {
                                                        color: '#9e2838',
                                                    },
                                                },
                                                data: scatter,
                                            },
                                            {
                                                type: 'scatter',
                                                name: '第二批次电信普遍服务试点城市',
                                                coordinateSystem: 'geo',
                                                symbol: 'pin',
                                                symbolSize: 18,
                                                label: {
                                                    normal: { show: false },
                                                    emphasis: { show: true },
                                                },
                                                itemStyle: {
                                                    normal: {
                                                        color: '#6ecebd',
                                                    },
                                                },
                                                data: scatter2,
                                            },
                                            {
                                                type: 'scatter',
                                                name: '第三批次电信普遍服务试点城市',
                                                coordinateSystem: 'geo',
                                                symbol: 'pin',
                                                symbolSize: 18,
                                                label: {
                                                    normal: { show: false },
                                                    emphasis: { show: true },
                                                },
                                                itemStyle: {
                                                    normal: {
                                                        color: '#e6a717',
                                                    },
                                                },
                                                data: scatter3,
                                            }],
                                        };
                                    },
                                );
                            },
                        );
                    },
                );
            },
        );
        this.http.get<ResponseType>('/api/22031/all')
            .subscribe(
            data => {
                this.theWord = data.result[0].value;
                this.theWord1 = data.result[1].value;
                this.theWord2 = data.result[2].value;
            },
        );
    }
}
