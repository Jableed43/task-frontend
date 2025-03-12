import { Paper, Box, Typography } from '@mui/material';

function Footer() {
    return (
        <Paper
            sx={{
                backgroundColor: "#0E538C", 
                color: "black", 
                padding: 1,
                position: "fixed",
                bottom: 0,
                width: "100%",
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                boxShadow: "0 -1px 5px rgba(0, 0, 0, 0.1)",
                zIndex: 100,
            }}
            component="footer"
            square
            variant="outlined"
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                <Typography variant="body2" paddingX={2} >
                    © {new Date().getFullYear()} Jnl. All rights reserved.
                </Typography>

               
            </Box>
        </Paper>
    );
}

export default Footer;
