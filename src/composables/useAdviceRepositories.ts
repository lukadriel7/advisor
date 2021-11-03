import { ref, Ref } from 'vue';
import { axios } from 'boot/axios';
import { DataSlip, Slip } from 'src/interfaces';

export default function useAdviceRepositories(quantity: Ref<number>) {
  const advices = ref<Slip[]>([]);
  const isLoading = ref(false);
  const getAdviceRepositories = () => {
    const adviceSearchList = [];
    isLoading.value = true;
    for (let index = 0; index < quantity.value; index++) {
      adviceSearchList.push(
        axios.get<DataSlip>(
          `${process.env.ADVICESLIP_API}?t=${new Date().getTime() + index}`
        )
      );
    }
    axios
      .all(adviceSearchList)
      .then((responses) => {
        advices.value = responses
          .map((res) => res.data.slip)
          .sort((a, b) => a.id - b.id);
      })
      .catch((err) => console.log(err))
      .finally(() => (isLoading.value = false));
  };

  return {
    getAdviceRepositories,
    advices,
    isLoading,
  };
}
