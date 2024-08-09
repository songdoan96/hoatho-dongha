import moment from "moment";

export const formatDate = (date: Date | string | undefined) => {
  if (date) {
    return moment(new Date(date)).format("DD-MM-YYYY");
  }
};
