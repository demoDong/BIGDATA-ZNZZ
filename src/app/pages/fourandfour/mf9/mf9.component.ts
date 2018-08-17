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
    selector: 'do-example-mf9',
    templateUrl: 'mf9.component.html',
    styleUrls: ['mf9.component.scss'],
})


export class Mf9Component implements OnInit {
    arrList1 = [];
    arrList2 = [];
    arrList3 = [];
    arrList4 = [];
    arrList5 = [];
    Arr = [];
    arrowShow: Array<boolean>;
    tableHead = [];
    tableFeild= [];
    provinceTable = [];

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
        this.tableHead = ['排名', '省', '市', '县', '竞争力指数', '基础条件指数', '运行绩效指数', '发展活力指数', '主导产业'];
        // tslint:disable-next-line:max-line-length
        this.tableFeild = ['rank', 'province', 'city', 'country', 'index', 'basicIndex', 'runIndex', 'activeIndex', 'ideaIndustry'];
        this.http.get<ResponseType>('/api/351/query?params=Year:e:2017')
            .subscribe(
            data => {
                const sepialTable = [];
                const result = data.result;
                console.log('表');
                console.log(result);
                // tslint:disable-next-line:forin
                for (const i in result) {
                    sepialTable.push(
                        // tslint:disable-next-line:max-line-length
                        {'rank': result[i].DevIndexRank, 'province': result[i].Province, 'city': result[i].City, 'country': result[i].Country, 'index': result[i].CompetitivenessIndex, 'basicIndex':result[i].BasicConditionIndex, 'runIndex': result[i].PerIindex, 'activeIndex': result[i].DevIndex, 'ideaIndustry': result[i].PrimeIndustry},
                    );
                }
                this.zone.run(() => this.provinceTable = sepialTable);
            },
        );
    }
}
