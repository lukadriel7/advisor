import { Slip } from 'src/interfaces';

export const englishColumns = [
  {
    name: 'id',
    label: 'ID',
    field: (row: Slip) => row.id,
    align: 'center',
    sortable: false,
  },
  {
    name: 'advice',
    label: 'Advice',
    field: (row: Slip) => row.advice,
    align: 'left',
    sortable: false,
  },
];
