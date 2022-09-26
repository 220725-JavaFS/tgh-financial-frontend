import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';

xdescribe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should remove the userid from local storage", () => {
    localStorage.setItem('current-user', '123345');
    component.logout();
    expect(localStorage.getItem('current-user')).toBeUndefined;
  });

  it("should remove current account from local storage", () => {
    localStorage.setItem('current-account', '12345');
    component.logout();
    expect(localStorage.getItem('current-account')).toBeUndefined;
  });
});
