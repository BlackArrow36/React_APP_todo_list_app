import React from 'react';
import DateDisplay from './DateDisplay';

function TaskInfo({ task, dateFormat }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
      <strong>{task.text}</strong>
      <DateDisplay date={task.dueDate} format={dateFormat} />
    </div>
  );
}

export default TaskInfo;
