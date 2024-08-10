import moment from "moment";

export const formatDate = (date: Date | string | undefined, format?: string | nul) => {
  if (date) {
    return moment(new Date(date)).format(format ?? "DD-MM-YYYY");
  }
};
