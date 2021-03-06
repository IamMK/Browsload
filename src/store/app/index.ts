export const appStore = {
  state: () => {
    return {
      siteUrl: "/orders/",
      orderNo: "",
      error: false,
      label: "order.zip",
      downloadStatus: 0,
      progress: { percent: 0, speed: 0, remaining: { minutes: 0, seconds: 0 } },
    };
  },
  getters: {
    url: (state: { siteUrl: string; orderNo: string }) => {
      return state.siteUrl + state.orderNo + ".zip";
    },
  },
};
