import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaVictoriaComponent } from './pantalla-victoria.component';

describe('PantallaVictoriaComponent', () => {
  let component: PantallaVictoriaComponent;
  let fixture: ComponentFixture<PantallaVictoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PantallaVictoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaVictoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
