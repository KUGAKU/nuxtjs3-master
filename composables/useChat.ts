import { chatRepository } from "repository/chatRepository";

export const useChat = () => {
  const data = ref();
  const isLoading = ref(false);

  const fetchData = async () => {
    isLoading.value = true;
    try {
      data.value = await chatRepository.startConversation();
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  return { data, fetchData, isLoading };
};
