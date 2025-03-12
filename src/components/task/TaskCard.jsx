import PropTypes from 'prop-types';
import { Card, CardContent, CardActions, Button, Typography, FormControl, Select, MenuItem } from '@mui/material';
import Grid2 from '@mui/material/Grid2';

const TaskCard = ({ task, handleStatusUpdate, handleEdit, handleDelete, loadingDelete }) => {
  return (
    <Grid2 item xs={12} sm={6} md={4} key={task._id}>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {task.title}
          </Typography>
          <Typography variant="body2">
            <strong>Description:</strong> {task.description}
          </Typography>
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <Select
              value={task.status}
              onChange={(e) => handleStatusUpdate(task, e.target.value)}
            >
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
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['pending', 'in-progress', 'completed']).isRequired
  }).isRequired,
  handleStatusUpdate: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  loadingDelete: PropTypes.bool.isRequired
};

export default TaskCard;
