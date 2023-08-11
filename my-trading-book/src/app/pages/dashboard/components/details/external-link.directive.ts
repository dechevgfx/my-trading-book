import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[externalLink]'
})
export class ExternalLinkDirective {
  @Input('externalLink') link: string | undefined;

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.preventDefault();
    window.open(this.link, '_blank');
  }
}
