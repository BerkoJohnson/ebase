import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSchoolInfoComponent } from './current-school-info.component';

describe('CurrentSchoolInfoComponent', () => {
  let component: CurrentSchoolInfoComponent;
  let fixture: ComponentFixture<CurrentSchoolInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentSchoolInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSchoolInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
