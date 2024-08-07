import { Component, inject } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { AuthService, ModalService } from '@services';
import { toSignal } from '@angular/core/rxjs-interop';
import { EditProfileComponent } from 'app/views/edit-profile/edit-profile.component';
import { SideNavAction, SideNavActionsEnum } from '@enums';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  userInfo = toSignal(inject(AuthService).currentUser$);

  SideNavActionsEnum = SideNavActionsEnum;

  #modalService = inject(ModalService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  currentRoute = toSignal(
    this.#router.events.pipe(map((event) => (event as NavigationStart).url))
  );

  openEditProfileModal() {
    this.#modalService.open(EditProfileComponent, {
      closeOnBackDropClick: true,
      config: { minHeight: '65rem', width: '27rem' },
    });
  }

  execSideNavAction(action: SideNavAction) {
    this.#router.navigate([SideNavActionsEnum.sideNavRoute.get(action.label)], {
      relativeTo: this.#route,
    });
  }
}
