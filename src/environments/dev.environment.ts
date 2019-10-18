import {AppModel} from '../app/app.model';

export const environment: AppModel = {
    api: {
      patient: {
        url: 'patient'
      },
      generalInfo: {
        url: 'generalInfo',
      },
      fluorography: {
        url: 'fluorography'
      },
      surgicalintervention: {
        url: 'surgicalintervention'
      },
      vaccinationstatus : {
        url: 'vaccinationstatus'
      }

    },
    production: false
  }
;
