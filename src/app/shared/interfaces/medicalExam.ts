export interface IMedicalExam {
  date: string;
  allowance: string;
  id: number;
  patientId: number;
  bloodchemistryanalysis: [];
  doctordiagnosis: [];
  electrocardiogram: [];
  generalbloodanalysis: [];
  generalurineanalysis: [];
  heartultrasound: [];
}

export interface IMedicalExams extends Array<IMedicalExam> {
}
