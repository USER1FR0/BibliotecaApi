import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarMultasComponent } from './pagar-multas.component';

describe('PagarMultasComponent', () => {
  let component: PagarMultasComponent;
  let fixture: ComponentFixture<PagarMultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagarMultasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagarMultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
