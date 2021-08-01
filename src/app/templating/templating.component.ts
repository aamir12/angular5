import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval } from "rxjs/observable/interval";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-templating",
  templateUrl: "./templating.component.html",
  styleUrls: ["./templating.component.css"],
})
export class TemplatingComponent implements OnInit, OnDestroy {
  toggle: boolean = false;
  timer: number = 0;
  timeSub: Subscription;
  constructor() {}

  ngOnInit() {}
  start() {
    this.timeSub = interval(1000).subscribe((x) => {
      this.timer++;
    });
  }

  stop() {
    this.timeSub && this.timeSub.unsubscribe();
  }

  ngOnDestroy() {
    this.timeSub && this.timeSub.unsubscribe();
  }
}
