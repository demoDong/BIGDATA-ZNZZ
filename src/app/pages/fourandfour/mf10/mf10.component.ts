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
  selector: 'do-example-mf10',
  templateUrl: 'mf10.component.html',
  styleUrls: ['mf10.component.scss'],
})


export class Mf10Component implements OnInit {
  theme = 'echart-theme';
  nameMap = 'china';
  fixedChange: any;
  moveChange: any;
  rightBottomLine: any;

  scatterData: object = {};
  mapData: object = {};
  ajaxNum: number = 0;
  timeData: Array<string> = [];

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
    this.http.get<ResponseType>('/api/20004/all')
      .subscribe(
      data => {
        const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
        console.log(result);
        this.fixedChange = {
          title: {
            text: '前 10',
            left: 'center',
            top: '5%',
            textStyle: {
              color: 'white',
            },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '0%',
            containLabel: true,
          },
          xAxis: {
            show: false,
            type: 'value',
            axisLine: { show: false },
            splitLine: { show: false },
          },
          yAxis: {
            type: 'category',
            axisLine: { show: false },
            splitLine: { show: false },
            data: result[1],
            axisLabel: {
              color: 'white',
              rotate: 0,
            },
          },
          series: [
            {
              type: 'bar',
              data: result[0],
            },
          ],
        };
      },
    );
    this.http.get<ResponseType>('/api/302/all')
      .subscribe(
      data => {
        const result = this.transService.onObjArray(data.result, '', 'ec3-visualMap');
        for (const iterator of data.result) {
          if (this.mapData[iterator.Year] === undefined) {
            this.mapData[iterator.Year] = [];
            this.timeData.push(iterator.Year);
          }
          this.mapData[iterator.Year].push({
            name: iterator.name,
            value: iterator.value,
          });
        }
        this.ajaxNum++;
        this.creatMap();
      },
    );
    this.http.get<ResponseType>('/api/301/all')
      .subscribe(
      data => {
        for (const iterator of data.result) {
          if (this.scatterData[iterator.year] === undefined) {
            this.scatterData[iterator.year] = [];
          }
          this.scatterData[iterator.year].push([iterator.lon, iterator.lat, iterator.company]);
        }
        this.ajaxNum++;
        this.creatMap();
      },
    );
    this.http.get<ResponseType>('/api/20005/all')
      .subscribe(
      data => {
        const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
        this.moveChange = {
          title: {
            text: '后 10',
            left: 'center',
            top: '5%',
            textStyle: {
              color: 'white',
            },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '5%',
            containLabel: true,
          },
          xAxis: {
            type: 'value',
            show: false,
            axisLine: { show: false },
            splitLine: { show: false },
            position: 'buttom',
          },
          yAxis: {
            type: 'category',
            axisLine: { show: false },
            splitLine: { show: false },
            position: 'right',
            data: result[1],
            axisLabel: {
              color: 'white',
              rotate: 0,
            },
          },
          series: [
            {
              type: 'bar',
              data: result[0],
            },
          ],
        };
      },
    );
  }
  creatMap() {
    if (this.ajaxNum > 1) {
      const seriesData = [];
      // tslint:disable-next-line:forin
      for (const key of this.timeData) {
        seriesData.push({
          series: [
            {
              data: this.scatterData[key],
            },
            {
              data: this.mapData[key],
            },
          ],
        });
      }
      console.log(seriesData);
      this.rightBottomLine = {
        baseOption: {
          title: {
            text: '手机出货量地图',
            left: 'center',
            top: '1%',
            textStyle: {
              color: 'white',
              fontSize: 24,
            },
          },
          timeline: {
            currentIndex: this.timeData.length - 1,
            data: this.timeData,
            bottom: '10',
          },
          visualMap: {
            max: 1000,
            orient: 'vertical',
            left: '5',
            bottom: '20',
            textStyle: {
              color: '#fff',
            },
            seriesIndex: [1],
            calculable: true,
          },
          tooltip: {
            formatter: '{b}: {c}',
          },
          geo: {
            map: 'china',
            roam: true,
            top: 40,
            label: {
              normal: {
                show: true,

              },
            },
          },
          series: [
            {
              name: '',
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
                  color: '#B22A26',
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
              data: [],

            }, {
              type: 'map',
              geoIndex: 0,
              data: [],
            },
          ],
        },
        options: seriesData,
      };
    }
  }
}

