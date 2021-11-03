import { ref, Ref } from 'vue';

export default function useUniqueRamdomArray(number: Ref<number>) {
  const randomArray = ref<Array<number>>([]);
  const getUniqueRandomArray = () => {
    const randomSet = new Set<number>();
    while (randomSet.size < number.value) {
      randomSet.add(
        Math.floor(Math.random() * process.env.ADVICE_MAX_NUMBER) + 1
      );
    }
    randomArray.value = [...randomSet].sort((a, b) => a - b);
  };
  return {
    randomArray,
    getUniqueRandomArray,
  };
}
