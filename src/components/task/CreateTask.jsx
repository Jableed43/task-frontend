import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useCreateTask from "../../hooks/task/useCreateTask";
import useEditTask from "../../hooks/task/useEditTask";
import {
  Box,
  Button,
  TextField,
  Grid2,
  Typography,
  Alert,
} from "@mui/material";

function TaskManager({ taskToEdit, updateTaskList, clearTaskToEdit }) {
  const { mutateAsync: createTask, isLoading, error: createError } = useCreateTask();
  const { mutateAsync: editTask, error: editError } = useEditTask();

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (taskToEdit) {
      setForm({
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
      });
    } else {
      setForm({ title: "", description: "", status: "pending" });
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskToEdit) {
        const updatedTask = await editTask({ id: taskToEdit._id, formData: form });
        updateTaskList((prevTasks) =>
          prevTasks.map((task) => (task._id === taskToEdit._id ? updatedTask : task))
        );
        clearTaskToEdit();
      } else {
        const newTask = await createTask(form);
        updateTaskList((prevTasks) => [...prevTasks, newTask]);
        setForm({ title: "", description: "", status: "pending" });
      }
    } catch (err) {
      console.error("Task operation error:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
      <Box sx={{ p: 4 }}>
        <Typography textTransform={"capitalize"} variant="h5" align="center" gutterBottom>
          {taskToEdit ? "Edit Task" : "Create Task"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={3} justifyContent={"center"} >
            <Grid2 item xs={12}>
              <TextField label="Title" name="title" required fullWidth value={form.title} onChange={handleInputChange} />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                label="Description"
                name="description"
                required
                fullWidth
                multiline
                rows={4}
                value={form.description}
                onChange={handleInputChange}
              />
            </Grid2>
            {(createError || editError) && <Alert severity="error">{createError?.message || editError?.message}</Alert>}
            <Grid2 item xs={12}>
              <Button sx={{ textTransform: "capitalize"  }}  variant="contained" color="primary" type="submit" fullWidth disabled={isLoading}>
                {isLoading ? "Saving..." : taskToEdit ? "Edit Task" : "Create Task"}
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Box>
  );
}

TaskManager.propTypes = {
  taskToEdit: PropTypes.object,
  updateTaskList: PropTypes.func.isRequired,
  clearTaskToEdit: PropTypes.func.isRequired,
};

export default TaskManager;
