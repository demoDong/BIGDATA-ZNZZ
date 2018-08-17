import { Component, OnInit } from '@angular/core';
import { DoContainerComponent } from '../../../shared/do-container/do-container.component';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';


@Component({
    selector: 'do-example-mf2',
    templateUrl: 'mf2.component.html',
    styleUrls: ['mf2.component.scss'],
})


export class Mf2Component implements OnInit {
    nw2Option1: any;
    nw2Option2: any;
    nw2Option3: any;
    theWord: any;
    theWord1: any;
    theWord2: any;
    theWord3: any;
    theWord4: any;
    theWord5: any;
    theWord6: any;
    theWord7: any;

    arrList1 = [];
    arrList2 = [];
    arrList3 = [];
    arrList4 = [];
    arrList5 = [];
    Arr = [];
    arrowShow: Array<boolean>;
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
                this.arrowShow.fill(true);
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
            },
        );
        this.http.get<ResponseType>('/api/22029/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
            },
        );
        this.http.get<ResponseType>('/api/22043/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-visualMap');
                this.http.get<ResponseType>('/api/22043/query?params=type:E:制造业创新中心')
                    .subscribe(
                    data1 => {
                        const scatter = this.transService.onObjArray(data1.result, '', 'ec3-scatterMap');
                        console.log(scatter);
                        this.http.get<ResponseType>('/api/22043/query?params=type:E:试点示范城市/城市群')
                            .subscribe(
                            data2 => {
                                const scatter2 = this.transService.onObjArray(data2.result, '', 'ec3-scatterMap');
                                console.log(scatter2);
                                this.http.get<ResponseType>('/api/22043/query?params=type:E:示范基地')
                                    .subscribe(
                                    data3 => {
                                        const scatter3 = this.transService.onObjArray(data3.result, '',
                                            'ec3-scatterMap');
                                        console.log(scatter3);
                                        this.http.get<ResponseType>('/api/22043/query?params=type:E:五大工程示范项目')
                                            .subscribe(
                                            data4 => {
                                                const scatter4 = this.transService.onObjArray(data4.result, '',
                                                    'ec3-scatterMap');
                                                console.log(scatter4);
                                                this.http.get<ResponseType>
                                                    ('/api/22043/query?params=type:E:十大领域重点企业')
                                                    .subscribe(
                                                    data5 => {
                                                        const scatter5 = this.transService.onObjArray(data5.result, '',
                                                            'ec3-scatterMap');
                                                        console.log(scatter5);
                                                        this.nw2Option3 = {
                                                            color: ['#296FDD', '#65feca', '#e33f2e',
                                                                '#6f4ce8', '#296FDD'],
                                                            title: {
                                                                // text: '全国电信普遍服务试点城市地图', left: 'center',
                                                                // textStyle: {
                                                                //     fontSize: 20,
                                                                // },
                                                            },
                                                            tooltip: {
                                                                show: true,
                                                                formatter: function (params) {
                                                                    console.log(params);
                                                                    return params.data[2];
                                                                },
                                                                trigger: 'item',
                                                            },
                                                            legend: {
                                                                orient: 'vertical',
                                                                bottom: '10%',
                                                                left: '10%',
                                                                data: [{
                                                                    name: '制造业创新中心',
                                                                    icon: 'pin',
                                                                },
                                                                {
                                                                    name: '试点示范城市/城市群',
                                                                    icon: 'pin',
                                                                },
                                                                {
                                                                    name: '示范基地',
                                                                    icon: 'pin',
                                                                },
                                                                {
                                                                    name: '五大工程示范项目',
                                                                    icon: 'pin',
                                                                },
                                                                {
                                                                    name: '十大领域重点企业',
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
                                                                name: '制造业创新中心',
                                                                coordinateSystem: 'geo',
                                                                symbol: 'pin',
                                                                symbolSize: 18,
                                                                label: {
                                                                    normal: { show: false },
                                                                    emphasis: { show: false },
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
                                                                name: '试点示范城市/城市群',
                                                                coordinateSystem: 'geo',
                                                                symbol: 'pin',
                                                                symbolSize: 18,
                                                                label: {
                                                                    normal: { show: false },
                                                                    emphasis: { show: false },
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
                                                                name: '示范基地',
                                                                coordinateSystem: 'geo',
                                                                symbol: 'pin',
                                                                symbolSize: 18,
                                                                label: {
                                                                    normal: { show: false },
                                                                    emphasis: { show: false },
                                                                },
                                                                itemStyle: {
                                                                    normal: {
                                                                        color: '#e6a717',
                                                                    },
                                                                },
                                                                data: scatter3,
                                                            },
                                                            {
                                                                type: 'scatter',
                                                                name: '五大工程示范项目',
                                                                coordinateSystem: 'geo',
                                                                symbol: 'pin',
                                                                symbolSize: 18,
                                                                label: {
                                                                    normal: { show: false },
                                                                    emphasis: { show: false },
                                                                },
                                                                itemStyle: {
                                                                    normal: {
                                                                        color: '#6f4ce8',
                                                                    },
                                                                },
                                                                data: scatter4,
                                                            },
                                                            {
                                                                type: 'scatter',
                                                                name: '十大领域重点企业',
                                                                coordinateSystem: 'geo',
                                                                symbol: 'pin',
                                                                symbolSize: 18,
                                                                label: {
                                                                    normal: { show: false },
                                                                    emphasis: { show: false },
                                                                },
                                                                itemStyle: {
                                                                    normal: {
                                                                        color: '#296FDD',
                                                                    },
                                                                },
                                                                data: scatter5,
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
                    },
                );
            },
        );
        this.http.get<ResponseType>('/api/22042/all')
            .subscribe(
            data => {
                console.log(data);
                this.theWord = data.result[0].value;
                this.theWord1 = data.result[1].value;
                this.theWord2 = data.result[2].value;
                this.theWord3 = data.result[3].value;
                this.theWord4 = data.result[4].value;
                this.theWord5 = data.result[5].value;
                this.theWord6 = data.result[6].value;
                this.theWord7 = data.result[7].value;
            },
        );
    }
}
