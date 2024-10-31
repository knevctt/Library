import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponentComponent } from './book-details-component.component';

describe('BookDetailsComponentComponent', () => {
  let component: BookDetailsComponentComponent;
  let fixture: ComponentFixture<BookDetailsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetailsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
