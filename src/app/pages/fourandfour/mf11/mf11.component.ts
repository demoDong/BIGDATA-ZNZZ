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
  selector: 'do-example-mf11',
  templateUrl: 'mf11.component.html',
  styleUrls: ['mf11.component.scss'],
})


export class Mf11Component implements OnInit {
  theme = 'echart-theme';
  nameMap = 'china';
  fixedChange: any;
  moveChange: any;
  rightBottomLine: any;
  rightBottomPie: any;
  youshiOne: any;
  youshiTwo: any;

  scatterParkData: Array<object> = [];
  scatterCompanyData: Array<object> = [];
  legendParkData: Array<string> = [];
  legendCompanyData: Array<string> = [];
  // tslint:disable-next-line:max-line-length
  // colorList: Array<string> = ['#0cef97', '#6108bc', '#FF030B', '#D2D508', '#FD6A02', '#CB2EF2', '#06B42F', '#CEA969', '#02C5B5', '#1D58DF'];
  colorList: Array<string> = ['#0bf9e5', '#6108bc', '#FF030B', '#D2D508', '#FD6A02', '#CB2EF2', '#06B42F', '#e3ae05', '#02C5B5', '#1D58DF'];
  list: Array<string> = ['重点领域园区分布', '重点领域企业分布'];
  leftBtnHover: Array<boolean> = [true, false];

  pieParkData: object = {};
  pieCompanyData: object = {};
  rightBottomList: Array<string> = ['重点领域园区占比', '重点领域企业占比'];
  rightBottomBtnHover: Array<boolean> = [true, false];

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
    this.http.get<ResponseType>('/api/22080/all')
      .subscribe(
      data => {
        this.youshiOne = data.result[0].value1;
        this.youshiTwo = data.result[0].value2;
      });
    this.http.get<ResponseType>('/api/22076/all')
      .subscribe(
      data => {
        const dataOne = {};
        for (const iterator of data.result) {
          if (dataOne[iterator.重点领域] === undefined) {
            dataOne[iterator.重点领域] = [];
            this.legendParkData.push(iterator.重点领域);
          }
          dataOne[iterator.重点领域].push([iterator.lon, iterator.lat, iterator.标题]);
        }
        this.creatMapData('park', dataOne, this.legendParkData);
      },
    );
    this.http.get<ResponseType>('/api/22077/all')
      .subscribe(
      data => {
        const dataOne = {};
        for (const iterator of data.result) {
          if (dataOne[iterator.重点领域] === undefined) {
            dataOne[iterator.重点领域] = [];
            this.legendCompanyData.push(iterator.重点领域);
          }
          dataOne[iterator.重点领域].push([iterator.lon, iterator.lat, iterator.标题]);
        }
        this.creatMapData('company', dataOne, this.legendCompanyData);
      },
    );
    this.http.get<ResponseType>('/api/22078/all')
      .subscribe(
      data => {
        const dataOne = this.transService.onObjArray(data.result, '', 'ec3-pie');
        this.pieParkData = dataOne;
        this.creatPie(0);
      },
    );
    this.http.get<ResponseType>('/api/22079/all')
      .subscribe(
      data => {
        const dataOne = this.transService.onObjArray(data.result, '', 'ec3-pie');
        this.pieCompanyData = dataOne;
      },
    );
  }
  creatMapData(which, data, legend) {
    const seriesData = [];
    let index = 0;
    // tslint:disable-next-line:forin
    for (const key in data) {
      seriesData.push({
        name: legend[index],
        type: 'scatter',
        coordinateSystem: 'geo',
        animation: false,
        symbolSize: 10,
        rippleEffect: {
          brushType: 'stroke',
          scale: 7,
        },
        itemStyle: {
          normal: {
            color: this.colorList[index],
          },
        },
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          },
        },
        tooltip: {
          padding: 10,
          backgroundColor: '#222',
          borderColor: '#777',
          borderWidth: 1,
          formatter: function (obj) {
            const value = obj.value;
            return value[2];
          },
        },
        data: data[key],
      });
      index++;
    }
    if (which === 'park') {
      this.scatterParkData = seriesData;
    } else {
      this.scatterCompanyData = seriesData;
    }
    this.creatMap(0);
  }
  creatMap(which) {
    if (which === 0) {
      this.rightBottomLine = {
        title: {
          text: '重点领域园区/企业分布',
          left: '45%',
          top: '1%',
          textStyle: {
            color: 'white',
            fontSize: 24,
          },
        },
        tooltip: {
          formatter: '{b}: {c}',
        },
        legend: {
          orient: 'vertical',
          bottom: '5%',
          left: '4%',
          data: this.legendParkData,
          textStyle: {
            fontSize: 16,
          },
        },
        geo: {
          map: 'china',
          roam: true,
          top: '10%',
          left: '26%',
          label: {
            normal: {
              show: true,
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
        series: this.scatterParkData,
      };
    } else {
      this.rightBottomLine = {
        title: {
          text: '重点领域园区/企业分布',
          left: '45%',
          top: '1%',
          textStyle: {
            color: 'white',
            fontSize: 24,
          },
        },
        tooltip: {
          formatter: '{b}: {c}',
        },
        legend: {
          orient: 'vertical',
          bottom: '5%',
          left: '4%',
          data: this.legendCompanyData,
          textStyle: {
            fontSize: 16,
          },
        },
        geo: {
          map: 'china',
          roam: true,
          top: '10%',
          left: '26%',
          label: {
            normal: {
              show: true,
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
        series: this.scatterCompanyData,
      };
    }
  }
  creatPie(which) {
    if (which === 0) {
      this.rightBottomPie = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        grid: {
          top: '5%',
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['35%', '55%'],
            startAngle: 0,
            label: {
              normal: {
                show: true,
                formatter: '{b}:{d}%',
                fontSize: 18,
                // position: 'inside',
                align: 'left',
              },
              emphasis: {
                show: true,
                position: 'inside',
              },
              
            },
            avoidLabelOverlap: false,
            labelLine:{
              normal: {
                // show: false,
                length: 0,
                length2: 0,
              }
            },
            data: this.pieParkData,
          },
        ],
      };
    } else {
      this.rightBottomPie = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        grid: {
          top: '5%',
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['25%', '40%'],
            label: {
              normal: {
                show: true,
                formatter: '{b}:{d}%',
                fontSize: 18,
              },
              emphasis: {
                show: true,
                position: 'inside',
              },
            },
            data: this.pieCompanyData,
          },
        ],
      };
    }
  }
  mapBtnClicked(e) {
    this.leftBtnHover.fill(false);
    this.leftBtnHover[e] = true;
    this.creatMap(e);
  }
  rightBottomBtnClicked(e) {
    this.rightBottomBtnHover.fill(false);
    this.rightBottomBtnHover[e] = true;
    this.creatPie(e);
  }
}

