export const chatRepository = {
  startConversation: async () => {
    const { data, error } = await useFetch("http://127.0.0.1:8000/chat/", {
      method: "POST",
    });
    if (error) {
      console.error(error);
    }
    return data;
  },
};
