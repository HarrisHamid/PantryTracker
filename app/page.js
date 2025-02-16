'use client'
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Button, Modal, Stack, TextField, IconButton } from "@mui/material";
import { collection, query, getDocs, setDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';

// Import the Roboto Mono font
const robotoMonoFont = (
  <style jsx global>{`
    .kanit-thin {
      font-family: "Kanit", sans-serif;
      font-weight: 100;
      font-style: normal;
    }
    .kanit-extralight {
      font-family: "Kanit", sans-serif;
      font-weight: 200;
      font-style: normal;
    }
    .kanit-light {
      font-family: "Kanit", sans-serif;
      font-weight: 300;
      font-style: normal;
    }
    .kanit-regular {
      font-family: "Kanit", sans-serif;
      font-weight: 400;
      font-style: normal;
    }
    .kanit-medium {
      font-family: "Kanit", sans-serif;
      font-weight: 500;
      font-style: normal;
    }
    .kanit-semibold {
      font-family: "Kanit", sans-serif;
      font-weight: 600;
      font-style: normal;
    }
    .kanit-bold {
      font-family: "Kanit", sans-serif;
      font-weight: 700;
      font-style: normal;
    }
    .kanit-extrabold {
      font-family: "Kanit", sans-serif;
      font-weight: 800;
      font-style: normal;
    }
    .kanit-black {
      font-family: "Kanit", sans-serif;
      font-weight: 900;
      font-style: normal;
    }
    .kanit-thin-italic {
      font-family: "Kanit", sans-serif;
      font-weight: 100;
      font-style: italic;
    }
    .kanit-extralight-italic {
      font-family: "Kanit", sans-serif;
      font-weight: 200;
      font-style: italic;
    }
    .kanit-light-italic {
      font-family: "Kanit", sans-serif;
      font-weight: 300;
      font-style: italic;
    }
    .kanit-regular-italic {
      font-family: "Kanit", sans-serif;
      font-weight: 400;
      font-style: italic;
    }
    .kanit-medium-italic {
      font-family: "Kanit", sans-serif;
      font-weight: 500;
      font-style: italic;
    }
    .kanit-semibold-italic {
      font-family: "Kanit", sans-serif;
      font-weight: 600;
      font-style: italic;
    }
    .kanit-bold-italic {
      font-family: "Kanit", sans-serif;
      font-weight: 700;
      font-style: italic;
    }
    .kanit-extrabold-italic {
      font-family: "Kanit", sans-serif;
      font-weight: 800;
      font-style: italic;
    }
    .kanit-black-italic {
      font-family: "Kanit", sans-serif;
      font-weight: 900;
      font-style: italic;
    }
  `}</style>
);

export default function Home() {
  const [inventory, setInventory] = useState([]); 
  const [open, setOpen] = useState(false);  
  const [itemName, setItemName] = useState('');
  const [showLandingPage, setShowLandingPage] = useState(true); // State to control landing page visibility

  // Fetch items from Firebase
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "items"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach(doc => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  // Add Items
  const addItem = async (name) => {
    const itemToAdd = name || itemName;
    if (!itemToAdd) return;

    const docRef = doc(collection(firestore, 'items'), itemToAdd);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await updateDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, {
        quantity: 1,
      });
    }

    await updateInventory();
  };

  // Remove items
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'items'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await updateDoc(docRef, {
          quantity: quantity - 1,
        });
      }
    }

    await updateInventory();
  };

  // Gemini API Integration

  useEffect(() => {
    updateInventory();
    
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEnterApp = () => {
    setShowLandingPage(false); // Hide the landing page
  };

  const handleGoHome = () => {
    setShowLandingPage(true); // Show the landing page
  };

  return (
    <Box
      style={{
        backgroundImage: showLandingPage ? "url('/pantrytracker_background.jpg')" : "none",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      {robotoMonoFont}
      <canvas id="canvas-basic" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></canvas>
      {showLandingPage ? (
        // Landing Page Component
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          padding={4}
          borderRadius={8}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            className="roboto-mono-bold"
            style={{ position: 'absolute', top: 20, left: 20, color: 'white' }}
          >
            FUEL YOUR BODY
          </Typography>
          <img src='/pantrytracker_logo.jpg' alt="Logo" style={{ width: '400px', height: '340px', borderRadius: '15px', marginBottom: '20px' }} />
          <Typography 
            variant="h2"
            component="h1"
            style={{color: 'white' }}
            gutterBottom 
            className="roboto-mono-custom"
          >
            PantryTracker
          </Typography>
          <Typography 
            variant="h4"
            gutterBottom 
            style={{color: 'white' }}
            className="roboto-mono-light"
          >
            Track your food. Reach your goals. Learn new recipes.
          </Typography>
          <Box mt={4}>
            <Button 
              className="pill" 
              onClick={handleEnterApp}
              style={{ fontSize: '24px', color: 'black', padding: '12px 30px' }}
            >
              My Pantry
            </Button>
          </Box>
        </Box>
      ) : (
        // Main App Content
        <Box
          width="100vw"
          height="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <IconButton 
            style={{ position: 'absolute', top: 20, left: 20 }}
            onClick={handleGoHome}
          >
            <HomeIcon />
          </IconButton>
          <Modal open={open} onClose={handleClose}>
            <Box
              position="absolute"
              top="50%"
              left="50%"
              width="400px"
              bgcolor="white"
              border="2px solid black"
              boxShadow={24}
              p={4}
              display="flex"
              flexDirection="column"
              gap={3}
              sx={{
                transform: "translate(-50%, -50%)",
              }}
            >
              <Typography variant="h6" className="roboto-mono-bold">Add Item</Typography>
              <Stack width="100%" direction="row" spacing={2}>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={itemName}
                  onChange={(e) => { setItemName(e.target.value) }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    addItem();
                    setItemName('');
                    handleClose();
                  }}
                >Add</Button>
              </Stack>
            </Box>
          </Modal>
          <Box border="1px solid #333" height="830px" width="800px" borderRadius="8px" p={2} boxShadow="0 2px 10px rgba(0,0,0,0.1)">
            <Box 
              height="100px"
              bgcolor="tan"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="8px"
              mb={2}
            >
              <Typography variant='h2' color='#tan' className="roboto-mono-bold">
                Pantry Items
              </Typography>
            </Box>
            {/* show the Items */}
            <Stack 
              width="100%" 
              height="600px" 
              spacing={2} 
              overflow="auto" 
              p={2} 
              sx={{ 
                backgroundColor: "#fff", 
                borderRadius: "8px", 
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)" 
              }}
            >
              {inventory.map(({ name, quantity }) => (
                <Box
                  key={name}
                  width="100%"
                  minHeight="50px"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  backgroundColor="#fafafa"
                  padding={2}
                  borderRadius="8px"
                  boxShadow="0 1px 5px rgba(0,0,0,0.05)"
                >
                  <Typography 
                    variant="h6" 
                    color="#444" 
                    textAlign="center" 
                    className="roboto-mono-custom"
                    sx={{ flex: 1 }}
                  >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="#444" 
                    textAlign="center" 
                    className="roboto-mono-custom"
                    sx={{ flex: 1 }}
                  >
                    {quantity}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ flex: 1, justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#D2B48C", // Tan color
                        color: "#fff",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#C1A280" // Darker tan color
                        }
                      }}
                      onClick={() => {
                        addItem(name);
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#D2B48C", // Tan color
                        color: "#fff",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#C1A280" // Darker tan color
                        }
                      }}
                      onClick={() => {
                        removeItem(name);
                      }}
                    >
                      Remove
                    </Button>
                  </Stack>
                </Box>
              ))}
            </Stack>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button 
                variant="contained" 
                disableElevation 
                onClick={handleOpen}
                sx={{
                  fontSize: '24px', 
                  color: 'black', 
                  padding: '12px 30px', 
                  backgroundColor: "#D2B48C", // Tan color
                  "&:hover": {
                    backgroundColor: "#C1A280" // Darker tan color
                  }
                }}
              >
                Add New Item
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
