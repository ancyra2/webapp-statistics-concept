import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LastStudiesComponent } from '../last-studies/last-studies.component';
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, LastStudiesComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('slider') slider!: ElementRef;
  currentPosition = 0;
  currentIndex = 0;
  itemsLength = 0;
  sliderReference!: any;

  @Input() width = '100%';
  @Input() height = '300px';
  @Input() itemsReferenceName = '';
  @Input() itemHeight = 0;
  @Input() itemWidth = 0;
  @Output() currentIndexEvent = new EventEmitter<number>();

  ngAfterViewInit() {
    this.sliderReference = this.slider.nativeElement
    this.itemsLength = this.sliderReference.children.length;
  }
  prev(position: number) {

    if (this.currentIndex >= 2) {
      this.currentPosition -= position;
      this.sliderReference.style.transform = `translateX(${-(this.currentPosition)}px`;
      this.currentIndex--;
    } else {
      this.currentIndex = 0;
      this.currentPosition = 0;
      this.sliderReference.style.transform = `translateX(${(this.currentPosition)}px`;
    }
    this.currentIndexEvent.emit(this.currentIndex);
  }
  next(position: number) {

    if (this.currentIndex < this.itemsLength - 3) {
      this.currentPosition += position;
      this.sliderReference.style.transform = `translateX(${-(this.currentPosition)}px`;
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
      this.currentPosition = 0;
      this.sliderReference.style.transform = `translateX(${(this.currentPosition)}px`;
    }
    this.currentIndexEvent.emit(this.currentIndex);
  }
}
