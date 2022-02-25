import React, { useContext, useEffect } from 'react';
import { useRoute } from 'wouter';
import { observer } from 'mobx-react';
import { isNull } from 'lodash-es';
import ReactJsonView from 'react-json-view';

import { convertStringToJSON } from '../../../utils';
import { AppStoreContext, AsyncTasksStoreContext } from '../../../stores';

import './AsyncTaskResult.less';

const TaskErrorLogs: React.FC = observer(() => {
  const asyncTasksStore = useContext(AsyncTasksStoreContext);
  const appStore = useContext(AppStoreContext)
  const [, params] = useRoute(
    '/graph-management/:id/async-tasks/:taskId/result'
  );
  const taskResult = isNull(asyncTasksStore.singleAsyncTask)
    ? null
    : convertStringToJSON(asyncTasksStore.singleAsyncTask!.task_result);

  useEffect(() => {
    if (appStore.graphs !== "null") {
      console.log(params,"jjj");
      asyncTasksStore.setCurrentId(Number(params!.id));
      asyncTasksStore.fetchAsyncTask(Number(params!.taskId),params!.id);
    }
    return () => {
      asyncTasksStore.dispose();
    };
  }, [appStore.date]);

  return (
    <section className="async-task-result">
      {!isNull(asyncTasksStore.singleAsyncTask) &&
        (asyncTasksStore.singleAsyncTask.task_status === 'success' ? (
          !isNull(taskResult) ? (
            <ReactJsonView
              src={taskResult}
              name={false}
              displayObjectSize={false}
              displayDataTypes={false}
              groupArraysAfterLength={50}
            />
          ) : (
            asyncTasksStore.singleAsyncTask!.task_result
          )
        ) : (
          <div className="async-task-result-error">
            {asyncTasksStore.singleAsyncTask!.task_result}
          </div>
        ))}
    </section>
  );
});

export default TaskErrorLogs;
