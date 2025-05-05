import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { VideoStreamComponent } from '../../video-stream/video-stream.component';
import { LoginComponent } from '../..//login/login.component';
import { PublicationComponent } from '../../publication/publication.component';
import { UserPubComponent } from '../../user-pub/user-pub.component';
import { UpdatePubComponent } from '../../update-pub/update-pub.component';
import { SpectateurComponent } from '../../spectateur/spectateur.component';
import { RoleGuard } from '../../services/role.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    {
      path: 'video',
      component: VideoStreamComponent,
      canActivate: [RoleGuard],
      data: { expectedRole: 'Presse' }
    },

    {
      path: 'spectateur',
      component: SpectateurComponent,
      canActivate: [RoleGuard],
      data: { expectedRole: 'Spectateur' }
    },
    {path:'login',component:LoginComponent},
    {path:'AllPub',component:UserPubComponent},
    {path:'updatePub/:id',component:UpdatePubComponent},
    { path:'publication',component:PublicationComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
