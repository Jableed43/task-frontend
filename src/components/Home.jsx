import { Typography } from '@mui/material';
import Layout from './layout/Layout';
import tasks from '../assets/illustration-task.png';

function Home() {
  return (
    <Layout>
      <Typography 
        variant="h4" 
        sx={{ 
          color: 'black', 
          fontWeight: 'bold', 
          mt: 4 
        }}
      >
        Task Application
      </Typography>
      <Typography 
        variant="h6" 
        sx={{ 
          color: 'black', 
          mb: 4, 
          maxWidth: 600, 
          margin: '10px auto' 
        }}
      >
      Welcome ¡Glad to see you!
      </Typography>
      <img 
        src={tasks} 
        alt="tasks" 
        style={{ 
          width: '50%', 
          maxWidth: '400px', 
          margin: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' 
        }} 
      />
    </Layout>
  );
}

export default Home;
