import { Component, OnInit } from '@angular/core';
import { DoContainerComponent } from '../../../shared/do-container/do-container.component';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';


@Component({
    selector: 'do-example-nw3',
    templateUrl: 'nw3.component.html',
    styleUrls: ['nw3.component.scss'],
})


export class Nw3Component implements OnInit {
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
        this.http.get<ResponseType>('/api/22032/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.nw2Option1 = {
                    title: {
                        text: '共享单车应用变化情况',
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
                        right: '7%',
                        bottom: '20%',
                        containLabel: true,
                    },
                    legend: {
                        show: true,
                        data: ['应用规模', '下载规模'],
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
                            name: '（单位：个）',
                            // scale: true,
                            // max: 20000,
                            // min: 120000,
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
                        {
                            type: 'value',
                            name: '(单位:亿次)',
                            splitLine: {
                                show: false,
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
                            name: '下载规模',
                            type: 'bar',
                            data: result[0],
                            yAxisIndex: 1,
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
                            name: '应用规模',
                            type: 'line',
                            barWidth: '40%',
                            data: result[1],
                            yAxisIndex: 0,
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/22033/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.nw2Option2 = {
                    title: {
                        text: '移动政务应用变化情况',
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
                        right: '7%',
                        bottom: '20%',
                        containLabel: true,
                    },
                    legend: {
                        show: true,
                        data: ['应用规模', '下载规模'],
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
                            name: '（单位：个）',
                            // scale: true,
                            // max: 20000,
                            // min: 120000,
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
                        {
                            type: 'value',
                            name: '(单位:亿次)',
                            splitLine: {
                                show: false,
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
                            name: '下载规模',
                            type: 'bar',
                            data: result[0],
                            yAxisIndex: 1,
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
                            name: '应用规模',
                            type: 'line',
                            barWidth: '40%',
                            data: result[1],
                            yAxisIndex: 0,
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/22034/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                console.log(result);
                this.nw2Option3 = {
                    title: {
                        text: '移动APP规模变化情况',
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
                        right: '13%',
                        bottom: '15%',
                        containLabel: true,
                    },
                    legend: {
                        show: true,
                        data: ['应用规模', '下载规模'],
                        bottom: '5%',
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
                            name: '（单位：个）',
                            // scale: true,
                            // max: 20000,
                            // min: 120000,
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
                        {
                            type: 'value',
                            name: '（单位：亿次）',
                            splitLine: {
                                show: false,
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
                            name: '下载规模',
                            type: 'bar',
                            data: result[0],
                            yAxisIndex: 1,
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
                            name: '应用规模',
                            type: 'line',
                            barWidth: '40%',
                            data: result[1],
                            yAxisIndex: 0,
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/22035/all')
            .subscribe(
            data => {
                console.log(data);
                this.theWord = data.result[0].val1;
                this.theWord1 = data.result[0].val2;
                this.theWord2 = data.result[0].val3;
            },
        );
    }
}
