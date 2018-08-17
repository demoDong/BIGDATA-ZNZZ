import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DoEChartsModule } from '../shared/do-echarts/do-echarts.module';
import { HomePageComponent } from './homepage/homepage.component';
import { FourandforModule } from './fourandfour/fourandfour.module';
import { DatadecisionModule } from './datadecision/datadecision.module';
import { NetworkModule } from './network/network.module';
import { ThemeModule } from 'app/@theme/theme.module';
import { DoServiceModule } from 'app/shared/do-service/do-service.module';
import { InputTextModule } from 'primeng/primeng';



const PAGES_COMPONENTS = [
  PagesComponent,
  HomePageComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    PagesRoutingModule,
    DoEChartsModule,
    FourandforModule,
    DoServiceModule,
    InputTextModule,
    NetworkModule,
    DatadecisionModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
