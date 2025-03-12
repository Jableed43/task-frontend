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
} from "@mui/material";
import Swal from "sweetalert2";

function CreateTask({ taskToEdit, updateTaskList }) {
  const { mutateAsync: createTask, isLoading } = useCreateTask();
  const { mutateAsync: editTask } = useEditTask();

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
         
        Swal.fire({
          icon: "success",
          title: "Task Updated",
          text: "Your task has been updated successfully.",
        });
  
      } else {
  
        const newTask = await createTask(form);
        
        updateTaskList((prevTasks) => [...prevTasks, newTask]);
        setForm({ title: "", description: "", status: "pending" });
  
        Swal.fire({
          icon: "success",
          title: "Task Created",
          text: "Your task has been created successfully.",
        });
      }
    } catch (err) {
      console.error("Task operation error:", err);
  
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: "Something went wrong, please try again.",
      });
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

CreateTask.propTypes = {
  taskToEdit: PropTypes.object,
  updateTaskList: PropTypes.func.isRequired,
};

export default CreateTask;
