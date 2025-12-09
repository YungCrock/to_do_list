import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsTarefasComponent } from './forms-tarefas.component';

describe('FormsTarefasComponent', () => {
  let component: FormsTarefasComponent;
  let fixture: ComponentFixture<FormsTarefasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsTarefasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
