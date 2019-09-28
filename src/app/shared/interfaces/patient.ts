export interface IPatient {
  name: string;
  photo: string;
  id: number;
}
export interface IPatients extends Array<IPatient>{}
