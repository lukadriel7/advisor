import { watch, ref, Ref } from 'vue';
import { axios } from 'boot/axios';
import { DataSlip, Slip } from 'src/interfaces';

export default function useAdviceRepositories(quantity: Ref<Array<number>>) {
  const advices = ref<Slip[]>([]);
  const isLoading = ref(false);
  const getAdviceRepositories = () => {
    const adviceSearchList = [];
    isLoading.value = true;
    for (let index = 0; index < quantity.value.length; index++) {
      adviceSearchList.push(
        axios.get<DataSlip>(
          `${process.env.ADVICESLIP_API}/${quantity.value[index]}`
        )
      );
    }
    axios
      .all(adviceSearchList)
      .then((responses) => {
        advices.value = responses.map((res) => res.data.slip);
      })
      .catch((err) => console.log(err))
      .finally(() => (isLoading.value = false));
  };

  watch(quantity, getAdviceRepositories);

  return {
    getAdviceRepositories,
    advices,
    isLoading,
  };
}
