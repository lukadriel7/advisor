import { Slip, TranslatedAdvice } from 'src/interfaces';
import { ref, Ref, watch } from 'vue';

export default function useAdviceAggregators(
  advices: Ref<Slip[]>,
  translations: Ref<string[]>
) {
  const aggregatedAdvices = ref<TranslatedAdvice[]>([]);
  watch(translations, (value) => {
    aggregatedAdvices.value = advices.value.map((advice, index) => {
      return {
        id: advice.id,
        advice: advice.advice,
        translation: value[index],
      };
    });
  });
  return {
    aggregatedAdvices,
  };
}
