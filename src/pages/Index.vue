<template>
  <q-page padding>
    <q-card class="q-ma-md">
      <q-card-section>
        <h4>Enter a number to receive the corresponding amount of advice</h4>
      </q-card-section>
      <q-form @submit.prevent="getUniqueRandomArray">
        <q-card-section>
          <q-input
            type="number"
            :label="`Enter a number between ${adviceMinEntries} and ${adviceMaxEntries} (inclusive)`"
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
            label="Search advices"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
    <div class="q-pa-md">
      <q-table
        title="English Advices"
        :rows="advices"
        :columns="englishColumns"
        row-key="name"
        :loading="advicesLoading"
      />
    </div>
    <div class="q-pa-md">
      <q-table
        title="Polish translated Advices"
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

const adviceMinEntries = process.env.ADVICE_MIN_ENTRIES;
const adviceMaxEntries = process.env.ADVICE_MAX_ENTRIES;

export default defineComponent({
  name: 'PageIndex',
  setup() {
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
    };
  },
});
</script>
