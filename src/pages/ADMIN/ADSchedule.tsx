import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../utils/http";

import { AddCircle, Delete, Edit } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Button from "@mui/material/Button";
import { green, grey } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React from "react";
import { formatDate } from "../../utils/DateTimeFormat";
import { showToast } from "../../store/toastSlice";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import axiosErrorMessage from "../../utils/axiosError";
import Loading from "../../components/Loading";

interface ScheduleType {
  _id: string;
  done: boolean;
  content: string;
  date: Date;
}
function ADSchedule() {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const {
    isPending,
    data: schedules,
    refetch,
  } = useQuery({
    queryKey: ["getSchedules"],
    queryFn: async () => await http.get("/admin/schedules"),
  });

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => await http.post("/admin/schedule/create", data),
    onSuccess: (response) => {
      handleClose();
      dispatch(showToast({ message: response.data.message }));
      refetch();
    },
    onError: (error: AxiosError) => {
      dispatch(
        showToast({
          message: axiosErrorMessage(error),
          type: "error",
        })
      );
    },
  });
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => await http.delete("/admin/schedule/" + id),
    onSuccess: (response) => {
      console.log("🚀 ~ ADSchedule ~ response:", response);
      dispatch(showToast({ message: response.data.message }));
      refetch();
    },
    onError: (error: AxiosError) => {
      console.log("🚀 ~ ADSchedule ~ error:", error);
      dispatch(
        showToast({
          message: axiosErrorMessage(error),
          type: "error",
        })
      );
    },
  });

  const handleClose = () => {
    setOpen(false);
  };
  if (isPending) {
    return <Loading full />;
  }
  return (
    <div>
      <div className="flex items-center justify-center py-2 gap-2">
        <h2 className="uppercase font-bold">Lịch làm việc</h2>
        <IconButton onClick={() => setOpen(true)}>
          <AddCircle color="primary" />
        </IconButton>
      </div>
      <div className="w-1/2">
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              createMutation.mutate(formData);
            },
          }}
        >
          <DialogTitle>Thêm lịch</DialogTitle>
          <DialogContent className="w-full">
            <TextField
              autoFocus
              required
              id="date"
              name="date"
              label="Ngày"
              type="date"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="content"
              name="content"
              label="Nội dung"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Hủy</Button>
            <Button type="submit">Thêm</Button>
          </DialogActions>
        </Dialog>
      </div>
      {schedules?.data.schedules.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="bg-gray-600">
                <TableCell className=" text-white">NGÀY</TableCell>
                <TableCell className=" text-white">NỘI DUNG</TableCell>
                <TableCell className=" text-white">HOÀN THÀNH</TableCell>
                <TableCell className=" text-white"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules?.data.schedules.map((schedule: ScheduleType) => (
                <TableRow key={schedule._id}>
                  <TableCell>{formatDate(schedule.date)}</TableCell>
                  <TableCell>{schedule.content}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={schedule.done}
                      // onChange={(e) => console.log(e)}
                      sx={{
                        color: grey[600],
                        "&.Mui-checked": {
                          color: green[700],
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        if (confirm("Xóa lịch ?")) {
                          deleteMutation.mutate(schedule._id);
                        }
                      }}
                    >
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default ADSchedule;
