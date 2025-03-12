import "../../App.css";
import { useState } from "react";
import useFetchTask from "../../hooks/task/useFetchTask";
import useDeleteTask from "../../hooks/task/useDeleteTask";
import CreateTask from "./CreateTask";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  CircularProgress,
  Grid2,
  Alert,
  Select,
  MenuItem,
  FormControl,
  Pagination,
  InputLabel,
} from "@mui/material";
import Layout from "../layout/Layout";
import GoBackButton from "../layout/GoBackButton";
import useAuth from "../../hooks/useAuth";
import useEditTask from "../../hooks/task/useEditTask";
import empty from '../../assets/empty-box.svg';

function Tasks() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1); // Estado para la página actual
  const [resultsPerPage, setResultsPerPage] = useState(10); // Estado para resultados por página
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
    setPage(1); // Resetear la página al cambiar el filtro
  };

  const handleStatusUpdate = async (task, newStatus) => {
    if (task.status === newStatus) return;

    try {
      await editTask({ id: task._id, formData: { status: newStatus } });
      fetchTask(); // Recargar las tareas después de la actualización
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTask(); // Recargar la lista después de eliminar
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
    fetchTask(); // Recargar la lista después de crear o editar
    setShowForm(false);
    setEditingTask(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value); // Cambiar la página
  };

  const handleResultsPerPageChange = (event) => {
    setResultsPerPage(event.target.value); // Cambiar los resultados por página
    setPage(1); // Resetear a la primera página
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

        { tasks.length !== 0 && (<Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: "10px"
        }} >
          <FormControl variant="standard" sx={{ mb: 3 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={statusFilter}
              onChange={handleStatusChange}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ mb: 3 }}>
            <InputLabel id="results-label" >Results</InputLabel>
            <Select
            labelId="results-label"
              value={resultsPerPage}
              onChange={handleResultsPerPageChange}
              size="small"
              sx={{ width: 100 }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={40}>40</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>

        </Box>)}



        {showForm && <CreateTask taskToEdit={editingTask} updateTaskList={updateTaskList} />}

        <Grid2 container spacing={3} justifyContent="center">
          {loadingTasks && (
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3 }}>
              <CircularProgress />
            </Box>
          )}

          {fetchError && (
            <Grid2 item xs={12}>
              <Alert severity="error">Error: {fetchError}</Alert>
            </Grid2>
          )}

          {!loadingTasks &&
            tasks.map((task) => (
              <Grid2 item xs={12} sm={6} md={4} key={task._id}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {task.title}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Description:</strong> {task.description}
                    </Typography>
                    <FormControl variant="standard">
                      <Select value={task.status} onChange={(e) => handleStatusUpdate(task, e.target.value)}>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="in-progress">In Progress</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </CardContent>

                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button size="small" onClick={() => handleEdit(task)}>
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDelete(task._id)}
                      disabled={loadingDelete}
                    >
                      {loadingDelete ? "Deleting..." : "Delete"}
                    </Button>
                  </CardActions>
                </Card>
              </Grid2>
            ))}

          {!loadingTasks && tasks.length === 0 && !fetchError && (
            <Grid2 alignSelf="center" item xs={12}>
              <Typography variant="h5" align="center">
                No tasks available for your account.
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

          {deleteError && (
            <Grid2 item xs={12}>
              <Alert severity="error">Error deleting: {deleteError}</Alert>
            </Grid2>
          )}
        </Grid2>

        { !loadingTasks && tasks.length !== 0  && (
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
