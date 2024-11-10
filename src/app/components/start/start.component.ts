import { Component, ElementRef, HostListener, Renderer2, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-start',
  standalone: true,
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements AfterViewInit {
  activeIndex = 0;
  limit = 0;
  disabled = false;
  canvas: HTMLCanvasElement | null = null;

  readonly SPIN_FORWARD_CLASS = 'js-spin-fwd';
  readonly SPIN_BACKWARD_CLASS = 'js-spin-bwd';
  readonly DISABLE_TRANSITIONS_CLASS = 'js-transitions-disabled';
  readonly SPIN_DUR = 1000;

  @ViewChild('stage', { static: true }) stage!: ElementRef;
  @ViewChild('controls', { static: true }) controlsContainer!: ElementRef;

  controls!: HTMLElement[];

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.assignEls();
    this.prepareDom();
    this.attachListeners();
  }

  private assignEls(): void {
    if (this.controlsContainer) {
      this.controls = Array.from(this.controlsContainer.nativeElement.children) as HTMLElement[];
      this.updateActiveControl();
    } else {
      console.error('Controls container is not available.');
    }
  }

  private prepareDom(): void {
    this.setIndexes();
    this.paintFaces();
    this.duplicateSpinner();
    this.appendControls();
  }

  private setIndexes(): void {
    const spinnerChildren = this.el.nativeElement.querySelectorAll('.spinner > *') as NodeListOf<HTMLElement>;
    spinnerChildren.forEach((el: HTMLElement, index: number) => {
      el.setAttribute('data-index', index.toString());
      this.limit++;
    });
  }

  private paintFaces(): void {
    const faces = this.el.nativeElement.querySelectorAll('.spinner__face') as NodeListOf<HTMLElement>;

    if (faces && faces.length > 0) {
      Array.from(faces).forEach((face: HTMLElement) => {
        const color = face.getAttribute('data-bg') || '#fff';
        const bgImage = `url(${this.getBase64PixelByColor(color)})`;
        this.renderer.setStyle(face.children[0], 'backgroundImage', bgImage);
      });
    } else {
      console.error('Nenhum elemento de face encontrado.');
    }
  }

  private getBase64PixelByColor(hex: string): string | false {
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.height = 1;
      this.canvas.width = 1;
    }
    const ctx = this.canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = hex;
      ctx.fillRect(0, 0, 1, 1);
      return this.canvas.toDataURL();
    }
    return false;
  }

  private duplicateSpinner(): void {
    const spinner = this.el.nativeElement.querySelector('.spinner') as HTMLElement;
    if (spinner) {
      const duplicate = spinner.cloneNode(true);
      this.renderer.addClass(duplicate, 'spinner--right');
      this.renderer.removeClass(duplicate, 'spinner--left');
      this.renderer.appendChild(spinner.parentNode, duplicate);
    }
  }

  private appendControls(): void {
    const controlsContainer = this.controlsContainer.nativeElement;
    for (let i = 0; i < this.limit; i++) {
      const control = this.renderer.createElement('a');
      control.setAttribute('href', '#');
      control.setAttribute('data-index', i.toString());
      this.renderer.listen(control, 'click', (event: Event) => this.onControlClick(event, i));
      this.renderer.appendChild(controlsContainer, control);
    }
    this.updateActiveControl();
  }

  private updateActiveControl(): void {
    this.controls.forEach((control, index) => {
      this.renderer.removeClass(control, 'active');
      if (index === this.activeIndex) {
        this.renderer.addClass(control, 'active');
      }
    });
  }

  private spin(inc: number = 1): void {
    if (this.disabled || inc === 0) return;
    this.activeIndex = (this.activeIndex + inc + this.limit) % this.limit;
    this.disabled = true;

    const activeEls = this.el.nativeElement.querySelectorAll('.spinner__face.js-active') as NodeListOf<HTMLElement>;
    activeEls.forEach((el: HTMLElement) => this.renderer.removeClass(el, 'js-active'));

    const nextEls = this.el.nativeElement.querySelectorAll(`.spinner__face[data-index="${this.activeIndex}"]`) as NodeListOf<HTMLElement>;
    nextEls.forEach((el: HTMLElement) => {
      this.renderer.addClass(el, 'js-next');
      setTimeout(() => this.spinCallback(inc), this.SPIN_DUR);
    });
    this.updateActiveControl();
  }

  private spinCallback(inc: number): void {
    const activeEls = this.el.nativeElement.querySelectorAll('.js-next') as NodeListOf<HTMLElement>;
    activeEls.forEach((el: HTMLElement) => {
      this.renderer.removeClass(el, 'js-next');
      this.renderer.addClass(el, 'js-active');
    });

    this.renderer.addClass(this.stage.nativeElement, this.DISABLE_TRANSITIONS_CLASS);
    this.renderer.removeClass(this.stage.nativeElement, inc > 0 ? this.SPIN_FORWARD_CLASS : this.SPIN_BACKWARD_CLASS);
    setTimeout(() => {
      this.renderer.removeClass(this.stage.nativeElement, this.DISABLE_TRANSITIONS_CLASS);
      this.disabled = false;
    }, 100);
  }

  private onControlClick(event: Event, index: number): void {
    event.preventDefault();
    if (this.disabled) return;
    this.spin(index - this.activeIndex);
  }

  private attachListeners(): void {
    this.controls.forEach((control, index) => {
      this.renderer.listen(control, 'click', (event) => this.onControlClick(event, index));
    });
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      this.spin(-1);
    } else if (event.key === 'ArrowDown') {
      this.spin(1);
    }
  }
}
