import { Slip, Translation } from 'src/interfaces';
import { watch, ref, Ref } from 'vue';
import { axios } from 'boot/axios';

export default function useAdvicesTranslators(advices: Ref<Slip[]>) {
  const translations = ref<string[]>([]);
  const isLoading = ref(false);
  const getAdvicesTranslations = () => {
    isLoading.value = true;
    const query = advices.value.map((advice) => advice.advice).join('\n');
    const form = new FormData();
    form.append('q', query);
    form.append('source', 'en');
    form.append('target', 'pl');
    form.append('format', 'text');
    axios
      .post<Translation>(process.env.LIBRETRANSLATE_API, form)
      .then((res) => {
        translations.value = res.data.translatedText.split('\n');
      })
      .catch((err) => console.log(err))
      .finally(() => (isLoading.value = false));
  };
  watch(advices, getAdvicesTranslations);
  return {
    isLoading,
    getAdvicesTranslations,
    translations,
  };
}
