import { Router } from '@angular/router';
import { HttpApi } from './../../shared/do-service/http-api.service';
import { TreeNode, SelectItem, MultiSelectModule, InputTextModule } from 'primeng/primeng';
import { DoTreeService } from './../../shared/do-service/do-tree.service';
import { Component, OnInit, NgZone, Output } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'do-datadecision',
  templateUrl: 'datadecision.component.html',
  styleUrls: ['datadecision.component.scss'],
})
export class DatadecisionComponent implements OnInit {
  // address: any;
  // src: any;
  @Output() srcAddress: any;
  constructor(private doTreeService: DoTreeService, private http: HttpApi, private zone: NgZone,
    private router: Router) { }
  ngOnInit() {
    // console.log('111');
    // $('#imageId').attr('src', this.doTreeService.imagePath);
    // console.log($('#imageId').attr('src'));
  }
}
