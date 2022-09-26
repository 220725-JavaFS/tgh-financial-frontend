import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SendMoneyComponent } from './send-money.component';

xdescribe('SendMoneyComponent', () => {
  let component: SendMoneyComponent;
  let fixture: ComponentFixture<SendMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [ SendMoneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
