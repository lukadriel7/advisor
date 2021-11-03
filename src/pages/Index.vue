<template>
  <q-page padding>
    <q-card class="q-ma-md">
      <q-card-section>
        <h4>{{ t('title') }}</h4>
      </q-card-section>
      <q-form @submit.prevent="getUniqueRandomArray">
        <q-card-section>
          <q-input
            type="number"
            :label="
              t('inputLabel', { min: adviceMinEntries, max: adviceMaxEntries })
            "
            v-model.number="number"
            lazy-rules
            :rules="[
            (val: number) => val && (val >= adviceMinEntries && val <= adviceMaxEntries) || ''
          ]"
          />
        </q-card-section>
        <q-card-actions>
          <q-btn
            unelevated
            color="primary"
            class="full-width"
            :label="t('searchAdvices')"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
    <div class="q-pa-md">
      <q-table
        :title="t('englishAdvices')"
        :rows="advices"
        :columns="englishColumns"
        row-key="name"
        :loading="advicesLoading"
      />
    </div>
    <div class="q-pa-md">
      <q-table
        :title="t('polishAdvices')"
        :rows="aggregatedAdvices"
        :columns="translatedColumns"
        row-key="name"
        :loading="translationsLoading"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useUniqueRamdomArray from 'src/composables/useUniqueRandomArray';
import useAdviceRepositories from 'src/composables/useAdviceRepositories';
import useAdvicesTranslators from 'src/composables/useAdviceTranslators';
import useAdviceAggregators from 'src/composables/useAdviceAggregators';
import { englishColumns, translatedColumns } from 'components/tableColumns';
import { useI18n } from 'vue-i18n';

const adviceMinEntries = process.env.ADVICE_MIN_ENTRIES;
const adviceMaxEntries = process.env.ADVICE_MAX_ENTRIES;

export default defineComponent({
  name: 'PageIndex',
  setup() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { t } = useI18n();
    const number = ref();

    const { getUniqueRandomArray, randomArray } = useUniqueRamdomArray(number);
    const { advices, isLoading: advicesLoading } =
      useAdviceRepositories(randomArray);
    const { translations, isLoading: translationsLoading } =
      useAdvicesTranslators(advices);
    const { aggregatedAdvices } = useAdviceAggregators(advices, translations);

    return {
      number,
      adviceMinEntries,
      adviceMaxEntries,
      getUniqueRandomArray,
      englishColumns,
      translatedColumns,
      advices,
      advicesLoading,
      translationsLoading,
      aggregatedAdvices,
      t,
    };
  },
});
</script>
