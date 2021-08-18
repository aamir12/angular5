import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
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
  @ViewChild("box") box: ElementRef;
  constructor(public renderer: Renderer2) {}

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

  addClass() {
    this.renderer.addClass(this.box.nativeElement, "red");
  }

  removeClass() {
    this.renderer.removeClass(this.box.nativeElement, "red");
  }

  isAdded: boolean = true;
  toggleClass() {
    // this.isAdded = !this.isAdded;
    // this.renderer[this.isAdded ? "addClass" : "removeClass"](
    //   this.box.nativeElement,
    //   "red"
    // );
    this.box.nativeElement.classList.toggle("red");
  }
}
