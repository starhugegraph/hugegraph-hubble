import { merge } from 'lodash-es';
import {
  CommonResources,
  DataAnalyzeResources,
  GraphManagementSideBarResources,
  DataImportResources,
  AsyncTasksResources
} from './graph-managment';

import clusterState from './state-of-the-cluster.json'

const translation = {
  translation: merge(
    CommonResources,
    DataAnalyzeResources,
    GraphManagementSideBarResources,
    DataImportResources,
    AsyncTasksResources,
    clusterState
  )
};

export default translation;
