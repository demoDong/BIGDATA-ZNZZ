import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Mf1Component } from './mf1/mf1.component';
import { Mf2Component } from './mf2/mf2.component';
import { Mf3Component } from './mf3/mf3.component';
import { Mf4Component } from './mf4/mf4.component';
import { Mf5Component } from './mf5/mf5.component';
import { Mf6Component } from './mf6/mf6.component';
import { Mf7Component } from './mf7/mf7.component';
import { Mf8Component } from './mf8/mf8.component';
import { Mf9Component } from './mf9/mf9.component';
import { Mf10Component } from './mf10/mf10.component';
import { Mf11Component } from './mf11/mf11.component';
import { Mf12Component } from './mf12/mf12.component';
import { Mf13Component } from './mf13/mf13.component';




import { DoEChartsModule } from '../../shared/do-echarts/do-echarts.module';
import { DoFrameModule } from '../../shared/do-frame/do-frame.module';
import { DoContainerModule } from '../../shared/do-container/do-container.module';
import { HotTableModule } from 'angular-handsontable';
import { DataTableModule } from 'primeng/primeng';



@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [DoEChartsModule, DoFrameModule, DoContainerModule, CommonModule, HotTableModule, DataTableModule],
  declarations: [
    Mf1Component,
    Mf2Component,
    Mf3Component,
    Mf4Component,
    Mf5Component,
    Mf6Component,
    Mf7Component,
    Mf8Component,
    Mf9Component,
    Mf10Component,
    Mf11Component,
    Mf12Component,
    Mf13Component,
  ],
})
export class FourandforModule { }
