import { Component, inject } from '@angular/core';
import { IconComponent } from '../../../components/icon/icon.component';
import { AuthenticationViewsEnum, IconEnum } from '@enums';
import { AuthenticationViewsTrackerService } from '@services';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '@services';
import { tap } from 'rxjs';
import { IsSamePasswordDirective } from 'app/directives/isSamePassword';

@Component({
  selector: 'app-sign-up-modal-content',
  standalone: true,
  imports: [IconComponent, FormsModule, IsSamePasswordDirective],
  templateUrl: './sign-up-modal-content.component.html',
  styleUrl: './sign-up-modal-content.component.scss',
})
export class SignUpModalContentComponent {
  IconEnum = IconEnum;

  #authService = inject(AuthService);
  #authenticationViewsTrackerService = inject(
    AuthenticationViewsTrackerService
  );

  goToLoginPage() {
    this.#authenticationViewsTrackerService.setValue(
      AuthenticationViewsEnum.Login
    );
  }

  createAccount(form: NgForm, email: string, password: string, pseudo: string) {
    if (form.invalid) {
      return;
    }
    this.#authService
      .signup({ email, password, pseudo })
      .pipe(
        tap(() =>
          this.#authenticationViewsTrackerService.setValue(
            AuthenticationViewsEnum.Login
          )
        )
      )
      .subscribe();
  }
}
