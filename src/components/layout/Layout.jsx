import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Footer from './Footer';
import Header from './Header';

function Layout({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between', 
        background: 'linear-gradient(135deg, #ffffff, #F9D9A6)', 
        padding: 0, 
        margin: 0, 
      }}
    >
      <Header />
      <Box
        sx={{
          flex: 1,
          width: '100%',
          maxWidth: '1200px',
          textAlign: 'center',
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
