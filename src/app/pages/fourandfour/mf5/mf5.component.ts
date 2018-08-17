import { Component, OnInit } from '@angular/core';
import { DoContainerComponent } from '../../../shared/do-container/do-container.component';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { concat } from 'rxjs/operator/concat';
import { parse } from 'url';


@Component({
    selector: 'do-example-mf5',
    templateUrl: 'mf5.component.html',
    styleUrls: ['mf5.component.scss'],
})


export class Mf5Component implements OnInit {
    theme = 'echart-theme';
    nameMap = 'china';
    fixedChange: any;
    moveChange: any;
    rightBottomLine: any;
    rightBottomLine2: any;
    list = ['产能规划', '生产制造', '供应网络', '推广应用', '基础设施', '技术水平'];
    dataAll = [
        [
            [10.0, 8.05],
            [8.0, 6.95],
            [13.0, 7.58],
            [9.0, 8.81],
            [11.0, 8.33],
            [15.0, 9.96],
            [6.0, 7.25],
            [5.0, 5.26],
            [12.0, 10.85],
            [7.0, 5.82],
            [5.0, 5.68],
        ],
    ];
    theWord: any;
    theWord1: any;
    theWord2: any;
    theWord3: any;
    rBDisplayIs: Array<boolean>;

    mapChangeBtnDisplay: boolean;
    gywlDisplay: boolean;
    geoObj: any;
    geoObjIndex = 0;
    queryStr: any;
    constructor(private zone: NgZone, private router: Router, private http: HttpApi,
        private transService: DoDatatransService) {
    }
    ngOnInit() {
        this.mapChangeBtnDisplay = false;
        this.gywlDisplay = true;
        this.rBDisplayIs = [true, false, true, true, true, true];
        this.http.get<ResponseType>('/api/22064/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.fixedChange = {
                    title: {
                        text: '产量规模及增速',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    legend: {
                        show: true,
                        data: ['产量', '新能源汽车增速', '汽车产量增速'],
                        bottom: '1%',
                        orient: 'horizontal',
                        textStyle: {
                            fontSize: 14,
                            color: '#fff',
                        },
                    },
                    grid: [
                        {
                            left: '10%',
                            right: '15%',
                            // top: '28%'
                            bottom: '25%',
                        },
                    ],
                    yAxis: [{
                        type: 'value',
                        name: '（单位：万台）',
                        splitLine: {
                            show: true,
                        },
                        axisTick: {
                            show: false,
                        },
                        barGap: 15,
                        axisLine: {
                            show: false,
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
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        barGap: 15,
                        axisLine: {
                            show: false,
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
                                // alignWithLabel: true,
                                show: true,
                            },
                            data: result[0],
                            axisLabel: {
                                interval: 0,
                                rotate: 30,
                                show: true,
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
                            name: '产量',
                            type: 'bar',
                            data: result[3],
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
                            name: '汽车产量增速',
                            type: 'line',
                            yAxisIndex: 1,
                            data: result[1],
                            label: {
                                normal: {
                                    show: false,
                                },
                            },
                        },
                        {
                            name: '新能源汽车增速',
                            type: 'line',
                            yAxisIndex: 1,
                            data: result[2],
                            label: {
                                normal: {
                                    show: false,
                                },
                            },
                        }],
                };
            },
        );
        this.http.get<ResponseType>('/api/22075/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-pie');
                console.log(result);
                this.moveChange = {
                    title: [{
                        text: '市场结构及占比',
                    },
                    {
                        text: result[0].max,
                        bottom: '2%',
                    },
                    ],
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)',
                    },
                    grid: {
                        top: '5%',
                    },
                    series: [
                        {
                            name: '来源',
                            type: 'pie',
                            radius: ['45%', '65%'],
                            label: {
                                normal: {
                                    show: true,
                                    formatter: '{b}:{d}%',
                                },
                                emphasis: {
                                    show: true,
                                    position: 'inside',
                                    // textStyle: {
                                    //     fontSize: '30',
                                    //     fontWeight: 'bold',
                                    // },
                                },
                            },
                            labelLine: {
                                normal: {
                                    show: true,
                                    length: 1,
                                    length2: 2,
                                },
                            },
                            data: result,
                            itemStyle: {
                                emphasis: {
                                    // shadowBlur: 10,
                                    // shadowOffsetX: 10,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                                },
                            },
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/22066/all')
            .subscribe(
            data => {
                this.theWord = data.result[0].name1;
                this.theWord1 = data.result[0].name2;
            },
        );
        this.http.get<ResponseType>('/api/22067/all')
            .subscribe(
            data => {
                this.theWord2 = data.result[0].name;
            },
        );
        this.http.get<ResponseType>('/api/22068/all')
            .subscribe(
            data => {
                this.theWord3 = data.result[0].name;
            },
        );
        this.createMap([]);
    }
    rightBtnBottomClicked(index) {
        this.rBDisplayIs = [true, true, true, true, true, true];
        this.rBDisplayIs[index] = false;
        if (index === 1) {
            this.createMap([]);
        } else if (index === 5) {
            this.zone.run(() => this.router.navigate(['pages/mf4']));
        }
    }
    createMap(array: Array<string>) {
        this.gywlDisplay = true;
        this.mapChangeBtnDisplay = false;
        let queryStr = '';
        let legendArray = [];
        if (array !== []) {
            legendArray = array;
            for (const iterator of array) {
                queryStr += iterator + ',';
            }
            queryStr = queryStr.substring(0, queryStr.length - 1);
        }
        this.queryStr = queryStr;
        this.http.get<ResponseType>('/api/995/query?params=com_type:IN:' + queryStr)
            .subscribe(
            data => {
                const geoObj = {};
                const seriesObj = {};
                const seriesArray = [];
                // tslint:disable-next-line:max-line-length
                const colorArray = ['#0cef97', '#6108bc', '#FF030B', '#D2D508', '#02C5B5', '#06B42F', '#FD6A02', '#CEA969', '#CB2EF2', '#1D58DF'];
                let colorIndex = 0;
                for (const iterator of data.result) {
                    if (geoObj[iterator.com_name] === undefined) {
                        geoObj[iterator.com_name] = [iterator.lon, iterator.lat, iterator.com_name, iterator.com_type];
                    }
                    if (seriesObj[iterator.com_type] === undefined) {
                        seriesObj[iterator.com_type] = [];
                        legendArray.push(iterator.com_type);
                    }
                    seriesObj[iterator.com_type].push([iterator.lon, iterator.lat, iterator.com_name]);
                }
                if (this.geoObjIndex === 0) {
                    this.geoObj = geoObj;
                    this.geoObjIndex++;
                }
                // tslint:disable-next-line:forin
                for (const key in seriesObj) {
                    seriesArray.push({
                        type: 'scatter',
                        name: key,
                        coordinateSystem: 'geo',
                        symbol: 'pin',
                        symbolSize: 18,
                        itemStyle: {
                            normal: {
                                color: colorArray[colorIndex],
                            },
                        },
                        label: {
                            normal: { show: false },
                            emphasis: { show: false },
                        },
                        data: seriesObj[key],
                    });
                    colorIndex++;
                }
                this.zone.run(() => {
                    this.rightBottomLine = {
                        // title: [{
                        //     text: '产业发展地图',
                        //     textStyle: {
                        //         fontSize: 24,
                        //     },
                        // }],
                        tooltip: {
                            show: true,
                            formatter: function (params) {
                                return params.data[2];
                            },
                            trigger: 'item',
                        },
                        legend: {
                            orient: 'vertical',
                            bottom: '5%',
                            left: '4%',
                            data: legendArray,
                            textStyle: {
                                fontSize: 16,
                            },
                        },
                        geo: {
                            map: 'china',
                            roam: false,
                            top: '10%',
                            zoom: 1.2,
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
                        series: seriesArray,
                    };
                });
            });
    }
    onMapClick(obj) {
        let comName = '';
        if (obj.componentType === 'series') {
            comName = obj.data[2];
            if (this.geoObj[comName][3] === '整车') {
                // tslint:disable-next-line:max-line-length
                this.http.get<ResponseType>('/api/994/query?params=whole_ent_name:E:' + comName)
                    .subscribe(
                    data => {
                        this.changeMap(0, comName, data.result);
                    },
                );
            } else {
                // tslint:disable-next-line:max-line-length
                this.http.get<ResponseType>('/api/994/query?params=part_ent_name:E:' + comName)
                    .subscribe(
                    data => {
                        this.changeMap(1, comName, data.result);
                    },
                );
            }
        }
    }
    changeMap(type, name, data) {
        this.zone.run(() => {
            this.rightBottomLine = {};
            this.rightBottomLine2 = {};
            this.gywlDisplay = false;
            this.mapChangeBtnDisplay = true;
        });
        const mapLinesData = [];
        const seriesObj = {};
        const seriesArray = [];
        const lengedArray = [];
        // tslint:disable-next-line:max-line-length
        const colorArray = ['#0cef97', '#6108bc', '#FF030B', '#D2D508', '#02C5B5', '#06B42F', '#FD6A02', '#CEA969', '#CB2EF2', '#1D58DF'];
        let colorIndex = 0;

        seriesObj[this.geoObj[name][3]] = [];
        // tslint:disable-next-line:max-line-length
        seriesObj[this.geoObj[name][3]].push([this.geoObj[name][0], this.geoObj[name][1], this.geoObj[name][2]]);
        if (type === 0) {
            for (const iterator of data) {
                if (seriesObj[iterator.part_ent_type] === undefined) {
                    seriesObj[iterator.part_ent_type] = [];
                }
                // tslint:disable-next-line:max-line-length
                seriesObj[iterator.part_ent_type].push([this.geoObj[iterator.part_ent_name][0], this.geoObj[iterator.part_ent_name][1], this.geoObj[iterator.part_ent_name][2]]);
                mapLinesData.push({
                    fromName: iterator.part_ent_name,
                    toName: name,
                    coords: [
                        [this.geoObj[iterator.part_ent_name][0], this.geoObj[iterator.part_ent_name][1]],
                        [this.geoObj[name][0], this.geoObj[name][1]],
                    ],
                });
            }
        } else {
            for (const iterator of data) {
                if (seriesObj[iterator.part_ent_type] === undefined) {
                    seriesObj[iterator.part_ent_type] = [];
                }
                // tslint:disable-next-line:max-line-length
                seriesObj[iterator.part_ent_type].push([this.geoObj[iterator.whole_ent_name][0], this.geoObj[iterator.whole_ent_name][1], this.geoObj[iterator.whole_ent_name][2]]);
                mapLinesData.push({
                    fromName: name,
                    toName: iterator.whole_ent_name,
                    coords: [
                        [this.geoObj[name][0], this.geoObj[name][1]],
                        [this.geoObj[iterator.whole_ent_name][0], this.geoObj[iterator.whole_ent_name][1]],
                    ],
                });
            }
        }
        seriesArray.push({
            name: '',
            type: 'lines',
            zlevel: 0,
            effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 3,
            },
            lineStyle: {
                normal: {
                    color: colorArray[0],
                    width: 0,
                    curveness: 0.2,
                },
            },
            data: mapLinesData,
        });
        seriesArray.push({
            name: '',
            type: 'lines',
            zlevel: 1,
            symbol: ['none', 'arrow'],
            symbolSize: 10,
            effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: 'arrow',
                symbolSize: 8,
            },
            lineStyle: {
                normal: {
                    color: colorArray[0],
                    width: 1,
                    opacity: 0.6,
                    curveness: 0.2,
                },
            },
            data: mapLinesData,
        });
        // tslint:disable-next-line:forin
        for (const key in seriesObj) {
            lengedArray.push(key);
            seriesArray.push({
                type: 'scatter',
                zlevel: 2,
                name: key,
                coordinateSystem: 'geo',
                symbol: 'pin',
                symbolSize: 18,
                itemStyle: {
                    normal: {
                        color: colorArray[colorIndex],
                    },
                },
                label: {
                    normal: { show: false },
                    emphasis: { show: false },
                },
                data: seriesObj[key],
            });
            colorIndex++;
        }
        this.zone.run(() => {
            this.rBDisplayIs = [true, true, false, true, true, true];
            this.rightBottomLine2 = {
                tooltip: {
                    show: true,
                    formatter: function (params) {
                        return params.data[2];
                    },
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    bottom: '5%',
                    left: '4%',
                    data: lengedArray,
                    textStyle: {
                        fontSize: 16,
                    },
                },
                geo: {
                    map: 'china',
                    roam: false,
                    top: '10%',
                    zoom: 1.2,
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
                series: seriesArray,
            };
        });
    }
}
