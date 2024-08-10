import moment from "moment";

export const formatDate = (date: Date | string | undefined, format?: string | null) => {
  if (date) {
    return moment(new Date(date)).format(format ?? "DD-MM-YYYY");
  }
};
