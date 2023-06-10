import { async } from "q";
import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { ThemeProvider, Container, Box, Typography, CircularProgress, Button, Grid } from '@mui/material';
import { createTheme } from "@mui/material/styles";

import Header from "./Header";
import Footer from "./Footer";

function CatDetails() {
  const { catID } = useParams();

  const [catDetails, setCatDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    setUserEmail(localStorage.getItem('userEmail'));
    setUserRole(localStorage.getItem('role'));

  }, [userEmail, userRole]);



  useEffect(() => {
    const fetchCatData = async () => {
      setIsLoading(true);
      const response = await fetch(`/v1/cat/${catID}`);
      const data = await response.json();
      console.log(data.response);
      setCatDetails(data.response[0]);
      console.log(data.response[0].catImgPath);
      setIsLoading(false);
    };
    fetchCatData();
  }, [catID]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      secondary: {
        main: "#000000",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Header />
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Container maxWidth="md" sx={{mt: 12, mb: 12}}>
          {!catDetails ? 
          <>
              <Typography variant="h2" component="h1" gutterBottom>
                  Cannot find the cat
                </Typography>
          
          </> : 
          <>
           <Grid container spacing={16}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                sx={{
                  height: '100%',
                  width: '100%',
                  maxWidth: '100%',
                  borderRadius: '5px',
                  objectFit: 'cover',
                }}
                alt={catDetails.name}
                src={`/catImage/${catDetails.catImgPath}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ my: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                  {catDetails.name}
                </Typography>
                <Typography variant="body1" color="text.primary" paragraph>
                  Gender: {catDetails.gender}
                </Typography>
                <Typography variant="body1" color="text.primary" paragraph>
                  Breed: {catDetails.breed}
                </Typography>
                <Typography variant="body1" color="text.primary" paragraph>
                  Color: {catDetails.color}
                </Typography>
                <Typography variant="body1" color="text.primary" paragraph>
                  Age: {catDetails.age} years old
                </Typography>
                <Typography variant="body1" color="text.primary" paragraph>
                  Description: {catDetails.description}
                </Typography>

                { userRole === 'cw' ?            
                  <>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                      Adopt {catDetails.name}
                    </Button> 

                    <Button variant="contained" color="primary" sx={{ mt: 2 }} component={Link} to={`/updateCatDetails/${catID}`} >
                      Edit information
                    </Button> 
                  </>
                  : null
                }
              </Box>
            </Grid>
          </Grid>
          </>
        }

        </Container>
      )}
      <Footer />
    </ThemeProvider>
  );
}

export default CatDetails;
