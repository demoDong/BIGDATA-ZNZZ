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
    selector: 'do-example-mf13',
    templateUrl: 'mf13.component.html',
    styleUrls: ['mf13.component.scss'],
})


export class Mf13Component implements OnInit {
    rightlist = [];
    theme = 'echart-theme';
    nameMap = 'china';
    fixedChange: any;
    moveChange: any;
    rightBottomLine: any;
    theWord: any;
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
                this.arrowShow.fill(true);
                this.http.get<ResponseType>('/api/22142/query?params=type:E:' + iterator.text)
                    .subscribe(
                        data => {
                            const result = this.transService.onObjArray(data.result, '', '');
                            iterator.arrList = result[0];
                        });
            }
        }
        this.rBDisplayIs = [true, true, true, true, true, false];
        this.http.get<ResponseType>('/api/22162/all')
            .subscribe(
                data => {
                    const result = this.transService.onObjArray(data.result, '', 'ec3-scatterMap');
                    this.zone.run(() => {
                        this.rightBottomLine = {
                            title: {
                                text: '绿色制造项目分布图',
                                left: 'center',
                                top: '10%',
                                textStyle: {
                                    fontSize: 20,
                                },
                            },
                            tooltip: {
                                show: true,
                                formatter: function (params) {
                                    // console.log('3123242');
                                    // console.log(params);
                                    return params.data[5];
                                },
                                trigger: 'item',
                            },
                            legend: {
                                orient: 'vertical',
                                bottom: '28%',
                                right: '3%',
                                data: ['', '', ''],
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            geo: {
                                map: 'china',
                                roam: false,
                                // top: '10%',
                                zoom: 1,
                                // layoutCenter: ['50%', '50%'],
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
                                type: 'scatter',
                                name: '',
                                coordinateSystem: 'geo',
                                symbol: 'pin',
                                symbolSize: 18,
                                label: {
                                    normal: { show: false },
                                    emphasis: { show: false },
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#0cef97',
                                    },
                                },
                                data: result,
                            },
                            ],
                        };
                    });
                },
        );
        this.http.get<ResponseType>('/api/22163/all')
            .subscribe(
                data => {
                    const result = data.result;
                    this.rightlist = result;
                },
        );
        this.http.get<ResponseType>('/api/22164/all')
            .subscribe(
                data => {
                    const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                    this.moveChange = {
                        title: {
                            text: '单位能耗变化趋势',
                            left: 'center',
                            textStyle: {
                                fontSize: 20,
                            },
                        },
                        tooltip: { trigger: 'axis' },
                        textStyle: {
                            color: 'white',
                        },
                        legend: {
                            bottom: '5%',
                            data: ['规模以上企业单位工业增加值能耗同比下降率'],
                            textStyle: {
                                color: 'white',
                            },
                        },
                        grid: {
                            left: '3%', top: '10%',
                            right: '4%', bottom: '15%',
                            containLabel: true,
                        },
                        xAxis: {
                            type: 'category',
                            axisLabel: {
                                rotate: 0,
                            },
                            data: result[0],
                        },
                        yAxis: {
                            type: 'value',
                            scale: true,
                            axisTick: {
                                show: false,
                            },
                            name: '单位（%）',
                        },
                        series: [{
                            name: '规模以上企业单位工业增加值能耗同比下降率',
                            type: 'line',
                            data: result[1],
                        },
                        ],
                    };
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
