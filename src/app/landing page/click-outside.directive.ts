import { Directive,ElementRef,Output,EventEmitter,HostListener } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  @Output() public clickOutside = new EventEmitter();

  constructor(private _elementRef: ElementRef) { console.log(_elementRef.nativeElement);}

  @HostListener('document:click',['$event.target'])
  public onclick(targetElement){
    if(targetElement.id === 'search'){return;}
    const isClickedInside = this._elementRef.nativeElement.contains(targetElement);
  //  console.log(isClickedInside);
    if(!isClickedInside){
      this.clickOutside.emit();
    }
  }


}
