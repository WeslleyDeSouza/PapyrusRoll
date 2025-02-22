import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthPasswordForgetComponent } from './auth-password-forget.component';

describe('AuthComponent', () => {
  let component: AuthPasswordForgetComponent;
  let fixture: ComponentFixture<AuthPasswordForgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPasswordForgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPasswordForgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
