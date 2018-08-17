import { Component, OnInit } from '@angular/core';
import { DoContainerComponent } from '../../../shared/do-container/do-container.component';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { last } from '@angular/router/src/utils/collection';


@Component({
    selector: 'do-example-nw4',
    templateUrl: 'nw4.component.html',
    styleUrls: ['nw4.component.scss'],
})


export class Nw4Component implements OnInit {
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
        this.http.get<ResponseType>('/api/22036/all')
            .subscribe(
                data => {
                    const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                    this.nw2Option1 = {
                        title: {
                            text: '下载速率历史变化情况',
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
                                name: '(单位:Mbps)',
                                scale: true,
                                min: 9,
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
                            },
                        ],
                    };
                },
        );
        this.http.get<ResponseType>('/api/22040/all')
            .subscribe(
                data => {
                    this.nw2Option2 = {
                        title: {
                            text: '网间时延变化',
                        },
                        tooltip: {
                            formatter: '{a} <br/>{b} : {c}%',
                        },
                        series: [
                            {
                                center: ['30%', '50%'],
                                radius: '50%',
                                type: 'gauge',
                                detail: {
                                    formatter: '{value}\nms',
                                    fontSize: 16,
                                },
                                axisLine: {
                                    lineStyle: { width: 10 },
                                },
                                splitLine: {
                                    length: 15,
                                },
                                data: [{ value: data.result[1].val2016, name: '2016年' }],
                                title: {
                                    offsetCenter: [0, '100%'],
                                    fontSize: 25,
                                    color: '#fff',
                                },
                            },
                            {
                                center: ['70%', '50%'],
                                radius: '50%',
                                type: 'gauge',
                                detail: {
                                    formatter: '{value}\nms',
                                    fontSize: 16,
                                },
                                axisLine: {
                                    lineStyle: { width: 10 },
                                },
                                splitLine: {
                                    length: 15,
                                },
                                data: [{ value: data.result[1].val2017, name: '2017年' }],
                                title: {
                                    offsetCenter: [0, '100%'],
                                    fontSize: 25,
                                    color: '#fff',
                                },
                            },
                        ],
                    };
                },
        );
        this.http.get<ResponseType>('/api/22041/all')
            .subscribe(
                data => {
                    const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                    console.log(result);
                    this.nw2Option3 = {
                        title: {
                            text: '资费水平和流量使用历史变化情况',
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
                            bottom: '10%',
                            left: '5%',
                            right: '5%',
                            containLabel: true,
                        },
                        legend: {
                            show: true,
                            data: ['每GB数据流量费用', '用户月均移动互联网流量'],
                            bottom: '0%',
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
                                name: '(单位:元)',
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
                                name: '(单位:MB)',
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
                                name: '用户月均移动互联网流量',
                                type: 'line',
                                data: result[0],
                                yAxisIndex: 1,
                            },
                            {
                                name: '每GB数据流量费用',
                                type: 'line',
                                data: result[1],
                            },
                        ],
                    };
                },
        );

        this.http.get<ResponseType>('/api/22039/all')
            .subscribe(
                data => {
                    this.theWord = data.result[0].value;
                    this.theWord1 = data.result[1].value;
                    this.theWord2 = data.result[2].value;
                },
        );
    }
}
