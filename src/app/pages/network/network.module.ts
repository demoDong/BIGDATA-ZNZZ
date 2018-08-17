import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Nw1Component } from './nw1/nw1.component';
import { Nw2Component } from './nw2/nw2.component';
import { Nw3Component } from './nw3/nw3.component';
import { Nw4Component } from './nw4/nw4.component';
import { Nw5Component } from './nw5/nw5.component';
import { Nw6Component } from './nw6/nw6.component';
import { Nw7Component } from './nw7/nw7.component';
import { Nw8Component } from './nw8/nw8.component';
import { Nw9Component } from './nw9/nw9.component';
import { Nw10Component } from './nw10/nw10.component';
import { DoEChartsModule } from '../../shared/do-echarts/do-echarts.module';
import { DoFrameModule } from '../../shared/do-frame/do-frame.module';
import { DoNetworkMoudle } from '../../shared/do-network/do-network.moudle';
import { DialogModule, InputTextModule, DropdownModule, DataTableModule, SharedModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [DoEChartsModule, DoFrameModule, DoNetworkMoudle, CommonModule,
    DialogModule, FormsModule, InputTextModule, DropdownModule, DataTableModule,
    SharedModule],
  declarations: [
    Nw1Component,
    Nw2Component,
    Nw3Component,
    Nw4Component,
    Nw5Component,
    Nw6Component,
    Nw7Component,
    Nw8Component,
    Nw9Component,
    Nw10Component,
  ],
})
export class NetworkModule { }
