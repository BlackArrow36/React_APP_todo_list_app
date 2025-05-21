import React from 'react';

function DateDisplay({ date, format }) {
  if (!date) return null;

  const d = new Date(date);
  const formatted =
    format === 'us'
      ? `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}/${d.getFullYear()}`
      : `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;

  return <span>Due: {formatted}</span>;
}

export default DateDisplay;
