import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeModule, CheckboxModule, MultiSelectModule } from 'primeng/primeng';
import { NgModule } from '@angular/core';
import { DatadecisionComponent } from './datadecision.component';
import { DoEChartsModule } from '../../shared/do-echarts/do-echarts.module';
import { DoContainerModule } from '../../shared/do-container/do-container.module';
import { DoFrameModule } from '../../shared/do-frame/do-frame.module';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { SharedModule } from 'primeng/components/common/shared';
import { HotTableModule } from 'angular-handsontable';
import { DoDataMoudle } from '../../shared/do-data/do-data.moudle';


@NgModule({
  imports: [CommonModule, DoEChartsModule, DoContainerModule, DoFrameModule, FormsModule,
    TreeModule, CheckboxModule, DropdownModule, MultiSelectModule, DataTableModule,
    SharedModule, HotTableModule, DoDataMoudle],
  declarations: [
    DatadecisionComponent,
  ],
})
export class DatadecisionModule { }
