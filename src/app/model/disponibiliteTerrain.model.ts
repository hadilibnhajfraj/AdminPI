export class DisponibiliteTerrain {
  id?: number;
  date: string = '';
  jour: string = '';
  heureDebut: string = '';
  heureFin: string = '';
  disponible: boolean = false;
  terrain: { id: number } = { id: 0 }; // 👈 changement ici
}
