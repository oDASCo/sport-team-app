export interface AppModel {
  api: {
    patient: {
      url: string;
    },
    generalInfo: {
      url: string;
    },
    fluorography: {
      url: string;
    },
    surgicalintervention: {
      url: string;
    },
    vaccinationstatus : {
      url: string;
    },
    medicalExamination: {
      url: string;
    },
    injuriesDiseases: {
      url: string;
    },
  };
  production: boolean;
}

