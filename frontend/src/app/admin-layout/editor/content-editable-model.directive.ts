import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, OnInit } from '@angular/core';

@Directive({
  selector: '[appContentEditableModel]',
  standalone: true
})
export class ContentEditableModelDirective implements OnInit {
  /** Input olarak alınan model */
  @Input() model!: string;
  
  /** Model değişikliğini dışarıya bildirir */
  @Output() modelChange = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) {}

  /** Kullanıcı girişine göre model güncellenir */
  @HostListener('input', ['$event.target.innerText'])
  onInput(value: string): void {
    this.model = value;
    this.modelChange.emit(value);
  }

  /** Odak kaybedildiğinde DOM ile model senkronize edilir */
  @HostListener('blur')
  onBlur(): void {
    this.elementRef.nativeElement.innerText = this.model || '';
  }

  /** Odak kazanıldığında DOM ile model senkronize edilir */
  @HostListener('focus')
  onFocus(): void {
    this.elementRef.nativeElement.innerText = this.model || '';
  }

  /** Direktif başlatıldığında başlangıç değeri DOM ile eşitlenir */
  ngOnInit(): void {
    this.elementRef.nativeElement.innerText = this.model || ''; // 'this.model' kullanılmalı
  }
}
