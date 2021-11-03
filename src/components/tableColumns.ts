import { Slip, TranslatedAdvice } from 'src/interfaces';
import { i18n } from 'boot/i18n';
import { computed } from 'vue';
export const englishColumns = computed(() => [
  {
    name: 'id',
    label: 'ID',
    field: (row: Slip) => row.id,
    align: 'center',
    sortable: false,
  },
  {
    name: 'advice',
    label: i18n.global.t('advice'),
    field: (row: Slip) => row.advice,
    align: 'left',
    sortable: false,
  },
]);

export const translatedColumns = computed(() => [
  {
    name: 'id',
    label: 'ID',
    field: (row: TranslatedAdvice) => row.id,
    align: 'center',
    sortable: false,
  },
  {
    name: 'english',
    label: i18n.global.t('english'),
    field: (row: TranslatedAdvice) => row.advice,
    align: 'left',
    sortable: false,
  },
  {
    name: 'polish',
    label: i18n.global.t('polish'),
    field: (row: TranslatedAdvice) => row.translation,
    align: 'left',
    sortable: false,
  },
]);
