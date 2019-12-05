import { Component, OnInit } from '@angular/core';
import { Publisher } from 'src/app/models/publisher';
import { ActivatedRoute } from '@angular/router';
import { PublisherService } from 'src/app/service/publisher.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-edit-pub',
  templateUrl: './edit-pub.component.html',
  styleUrls: ['./edit-pub.component.css']
})
export class EditPubComponent implements OnInit {

  pub: Publisher;
  constructor(private route: ActivatedRoute,
              private PubService: PublisherService,
              private location: Location ) { }

  ngOnInit() {
  }
  getCateFromRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    this.PubService.getPublisherFromID(id).toPromise().then(res => this.pub = res);
  }
  save() {
    this.PubService.editPublisher(this.pub).subscribe();
    alert('Thành Công');
    this.goBack();
  }
  goBack(): void {
    this.location.back();
  }
}
