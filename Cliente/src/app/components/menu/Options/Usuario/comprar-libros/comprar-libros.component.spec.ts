import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprarLibrosComponent } from './comprar-libros.component';

describe('ComprarLibrosComponent', () => {
  let component: ComprarLibrosComponent;
  let fixture: ComponentFixture<ComprarLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComprarLibrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprarLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
