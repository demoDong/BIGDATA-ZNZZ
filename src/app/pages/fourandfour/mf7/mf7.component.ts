import { Component, OnInit } from '@angular/core';
import { DoContainerComponent } from '../../../shared/do-container/do-container.component';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import Handsontable from 'handsontable';


@Component({
    selector: 'do-example-mf7',
    templateUrl: 'mf7.component.html',
    styleUrls: ['mf7.component.scss'],
})


export class Mf7Component implements OnInit {

    theme = 'echart-theme';
    nameMap = 'china';
    fixedChange: any;
    rDisplayIs: boolean = false;
    rDdisplayIsNormal: boolean = true;

    tabItemsRight = ['计算机、通信和其他电子设备制造业',
    '电气机械和器材制造业',
    '化学原料和化学制品制造业',
    '汽车制造业',
    '金属制品业',
    '非金属矿物制品业',
    '橡胶和塑料制品业',
    '纺织服装、服饰业',
    '石油加工、炼焦和核燃料加工业',
    '通用设备制造业',
    '文教、工美、体育和娱乐用品制造业',
    '专用设备制造业',
    '皮革、毛皮、羽毛及其制品和制鞋业',
    '纺织业',
    '食品制造业',
    '有色金属冶炼和压延加工业',
    '家具制造业',
    '农副食品加工业',
    '医药制造业',
    '造纸和纸制品业',
    '黑色金属冶炼和压延加工业',
    '烟草制品业',
    '印刷和记录媒介复制业',
    '酒、饮料和精制茶制造业',
    '铁路、船舶、航空航天和其他运输设备制造业',
    '仪器仪表制造业',
    '废弃资源综合利用业',
    '木材加工和木、竹、藤、棕、草制品业',
    '其他制造业',
    '金属制品、机械和设备修理业',
    '化学纤维制造业',
    ];
    zidian = ['val27',
    'val26',
    'val14',
    'val24',
    'val21',
    'val18',
    'val17',
    'val6',
    'val13',
    'val22',
    'val12',
    'val23',
    'val7',
    'val5',
    'val2',
    'val20',
    'val9',
    'val1',
    'val15',
    'val10',
    'val19',
    'val4',
    'val11',
    'val3',
    'val25',
    'val28',
    'val30',
    'val8',
    'val29',
    'val31',
    'val16',
    ];
    // handsontable 配置
    columns: object[] = [];
    settings: object = {
        contextMenu: {
            callback: (key, options) => {
            },
            items: {
                'showChart': { name: '' },
            },
        },
    };
    isLoading: boolean = false;
    table: any[];

    constructor(private zone: NgZone, private router: Router, private http: HttpApi,
        private transService: DoDatatransService) {
    }
    ngOnInit() {
        this.http.get<ResponseType>('/api/22153/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                this.fixedChange = {
                    title: {
                        text: '广东省制造业大数据指数（MBI,基准分界线100）',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    legend: [{
                        show: true,
                        data: ['广东省制造业大数据指数', '广东省规模以上制造业增加值同比增速'],
                        bottom: '3%',
                        left: '2%',
                        textStyle: {
                            color: '#fff',
                        },
                    }],
                    grid: [
                        {
                            left: '15%',
                            top: '12%',
                            bottom: '20%',
                            right: '7%',
                        },
                    ],
                    yAxis: [{
                        type: 'value',
                        name: '',
                        min: 100,
                        max: 106,
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
                        min: 5,
                        max: 21,
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
                            data: result[2],
                            axisLabel: {
                                interval: '0',
                                show: true,
                                rotate: 45,
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
                            name: '广东省制造业大数据指数',
                            type: 'line',
                            yAxisIndex: 0,
                            data: result[0],
                        },
                        {
                            name: '广东省规模以上制造业增加值同比增速',
                            type: 'line',
                            yAxisIndex: 1,
                            data: result[1],
                        },
                    ],
                };
            },
        );

        this.columns = [
            { data: 'c', title: '地区', width: 150, renderer: 'html' },
        ];
        // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:forin
        for (const key in this.tabItemsRight) {
            const obj = { data: 'c' + key, title: this.tabItemsRight[key], width: 150, renderer: 'html' };
            this.columns.push(obj);
        }
        const dotSize = ['small', 'middle', 'big'];
        const dotColor = ['bad', 'low', 'good'];
        const tableData = [];
        this.http.get<ResponseType>('/api/22027/all')
            .subscribe(
            data => {
                let j = 0;
                for (const iterator of data.result) {
                    tableData[j] = [];
                    tableData[j].push(iterator.name);
                    for (const key of this.zidian) {
                        tableData[j].push(iterator[key]);
                    }
                    j++;
                }
                this.table = [];
                for (const item of tableData) {
                    const rowData = {
                        'c': '',
                        'c0': '',
                        'c1': '',
                        'c2': '',
                        'c3': '',
                        'c4': '',
                        'c5': '',
                        'c6': '',
                        'c7': '',
                        'c8': '',
                        'c9': '',
                        'c10': '',
                        'c11': '',
                        'c12': '',
                        'c13': '',
                        'c14': '',
                        'c15': '',
                        'c16': '',
                        'c17': '',
                        'c18': '',
                        'c19': '',
                        'c20': '',
                        'c21': '',
                        'c22': '',
                        'c23': '',
                        'c24': '',
                        'c25': '',
                        'c26': '',
                        'c27': '',
                        'c28': '',
                        'c29': '',
                        'c30': '',
                    };
                    for (let i = 0; i < item.length; i++) {
                        console.log(item[i]);
                        if (i > 0) {
                            rowData[this.columns[i]['data']] = '<div class="' + dotSize[item[i][0]]
                                + ' ' + dotColor[item[i][1]] + '"></div>';
                        } else {
                            rowData[this.columns[i]['data']] = item[i];
                        }
                    }
                    this.table.push(rowData);
                }
            });
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
