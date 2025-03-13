import "../../App.css";
import { useState } from "react";
import useFetchTask from "../../hooks/task/useFetchTask";
import useDeleteTask from "../../hooks/task/useDeleteTask";
import CreateTask from "./CreateTask";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Grid2,
  Alert,
  Pagination,
} from "@mui/material";
import Layout from "../layout/Layout";
import GoBackButton from "../layout/GoBackButton";
import useAuth from "../../hooks/useAuth";
import useEditTask from "../../hooks/task/useEditTask";
import empty from '../../assets/empty-box.svg';
import TaskCard from "./TaskCard";
import GenericFilter from "./GenericFilter";
import Toast from "../layout/Toast";

const statusOptions = [
  { value: "All", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" }
];

const resultsOptions = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
  { value: 40, label: "40" },
  { value: 50, label: "50" }
];

function Tasks() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const { tasks, error: fetchError, loading: loadingTasks, fetchTask, totalPages } = useFetchTask({
    status: statusFilter,
    page,
    limit: resultsPerPage,
  });
  const { deleteTask, error: deleteError, loading: loadingDelete } = useDeleteTask();
  const { isAuthenticated } = useAuth();
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { mutateAsync: editTask } = useEditTask();

  const handleStatusChange = async (event) => {
    setStatusFilter(event.target.value);
    setPage(1);
  };

  const handleStatusUpdate = async (task, newStatus) => {
    if (task.status === newStatus) return;
    try {
      await editTask({ id: task._id, formData: { status: newStatus } });
      fetchTask();
      Toast.fire({
        icon: "success",
        title: `Status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTask();

      Toast.fire({
        icon: "success",
        title: "Task Deleted",
        text: "The task has been deleted successfully.",
      });
    } catch (err) {
      console.error("Error deleting task:", err);

      Toast.fire({
        icon: "error",
        title: "Delete Failed",
        text: "There was an issue deleting the task. Please try again.",
      });
    }
  };


  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCreateNew = () => {
    setEditingTask(null);
    setShowForm((prev) => !prev);
  };

  const updateTaskList = () => {
    fetchTask();
    setShowForm(false);
    setEditingTask(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleResultsPerPageChange = (event) => {
    setResultsPerPage(event.target.value);
    setPage(1);
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <GoBackButton sx={{ position: "absolute", left: 0 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          {isAuthenticated && (
            <Button sx={{ textTransform: "capitalize" }} variant="contained" onClick={handleCreateNew}>
              {showForm ? "Cancel" : "Create New Task"}
            </Button>
          )}
        </Box>

        <Typography variant="h4" align="center" gutterBottom>
          Task List
        </Typography>

        {tasks.length !== 0 && (<Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: "10px" }}>
          <GenericFilter
            label="Status"
            value={statusFilter}
            onChange={handleStatusChange}
            options={statusOptions}
          />

          <GenericFilter
            label="Results"
            value={resultsPerPage}
            onChange={handleResultsPerPageChange}
            options={resultsOptions}
            width={100}
          />
        </Box>)}

        {showForm && <CreateTask taskToEdit={editingTask} updateTaskList={updateTaskList} />}

        {loadingTasks ? (
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid2 container spacing={3} justifyContent="center">
            {fetchError && (
              <Grid2 item xs={12}>
                <Alert severity="error">Error: {fetchError}</Alert>
              </Grid2>
            )}

            {!loadingTasks &&
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  handleStatusUpdate={handleStatusUpdate}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  loadingDelete={loadingDelete}
                />
              ))}

            {!loadingTasks && tasks.length === 0 && !fetchError && (
              <Grid2 alignSelf="center" item xs={12}>
                <GenericFilter
                  label="Status"
                  value={statusFilter}
                  onChange={handleStatusChange}
                  options={statusOptions}
                />
                <Typography variant="h5" align="center">
                 { statusFilter !== "All" ? "No tasks available for your account, try another status." : "No tasks available for your account."}
                </Typography>
                <img
                  src={empty}
                  alt="empty"
                  style={{
                    width: '50%',
                    maxWidth: '400px',
                    margin: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
                  }}
                />
              </Grid2>
            )}
          </Grid2>
        )}

        {deleteError && (
          <Grid2 item xs={12}>
            <Alert severity="error">Error deleting: {deleteError}</Alert>
          </Grid2>
        )}

        {!loadingTasks && tasks.length !== 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </Box>
    </Layout>
  );
}

export default Tasks;
