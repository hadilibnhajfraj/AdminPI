import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PublicationService {
  private apiUrl = "http://localhost:8082/publications/add";

  constructor(private http: HttpClient) {}

  addPublication(publication: any, file: File): Observable<any> {
    const token = localStorage.getItem("token");
    console.log("Token récupéré :", token); // Vérification du token

    if (!token) {
      console.error("Token JWT non trouvé dans localStorage");
      return; // Optionnellement, tu peux gérer une erreur ici.
    }

    const formData = new FormData();
    formData.append(
      "publication",
      new Blob([JSON.stringify(publication)], { type: "application/json" })
    );
    formData.append("file", file);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.apiUrl, formData, { headers });
  }
}
