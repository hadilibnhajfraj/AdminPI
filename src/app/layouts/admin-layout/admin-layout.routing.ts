import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { TypographyComponent } from "../../typography/typography.component";
import { IconsComponent } from "../../icons/icons.component";
import { MapsComponent } from "../../maps/maps.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { UpgradeComponent } from "../../upgrade/upgrade.component";
import { VideoStreamComponent } from "../../video-stream/video-stream.component";
import { LoginComponent } from "../..//login/login.component";
import { PublicationComponent } from "../../publication/publication.component";
import { UserPubComponent } from "../../user-pub/user-pub.component";
import { UpdatePubComponent } from "../../update-pub/update-pub.component";
import { SpectateurComponent } from "../../spectateur/spectateur.component";
import { RoleGuard } from "../../services/role.guard";
import { AllspectateurComponent } from "../../allspectateur/allspectateur.component";
import { UserListComponent } from '../../user-list/user-list.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'upgrade',        component: UpgradeComponent },
  {
    path: "video",
    component: VideoStreamComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: "Presse" },
  },
  {
   path: "AllPub", component: UserPubComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: "Presse" },
  },
  {
    path: "spectateur",
    component: SpectateurComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: "Spectateur" },
  },
  {
    path: "publication",
    component: AllspectateurComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: "Spectateur" },
  },
  { path: "login", component: LoginComponent },
  { path: "updatePub/:id", component: UpdatePubComponent },
  { path: "addpublication", component: PublicationComponent },
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
];
