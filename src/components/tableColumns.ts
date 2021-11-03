import { Slip, TranslatedAdvice } from 'src/interfaces';

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

export const translatedColumns = [
  {
    name: 'id',
    label: 'ID',
    field: (row: TranslatedAdvice) => row.id,
    align: 'center',
    sortable: false,
  },
  {
    name: 'english',
    label: 'English',
    field: (row: TranslatedAdvice) => row.advice,
    align: 'left',
    sortable: false,
  },
  {
    name: 'polish',
    label: 'Polish',
    field: (row: TranslatedAdvice) => row.translation,
    align: 'left',
    sortable: false,
  },
];
