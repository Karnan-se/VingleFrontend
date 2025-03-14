

import { motion } from "framer-motion"

import { Container, Typography, Grid, Card, CardContent, Box } from "@mui/material"
import { GraduationCap, Users, Award, BookOpen, Globe } from "lucide-react"
import Navbar from "../../generalParts/landipage/Navbar"

export default function AboutUs() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

 

  return (
    
    

    <Container maxWidth="lg" sx={{ py: 8 }}>
        <Navbar />
      
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
            About EduLearn
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}>
            Transforming education through innovative online learning experiences
          </Typography>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Box sx={{ position: "relative", height: "400px", borderRadius: "16px", overflow: "hidden", mb: 4 }}>
              <img
                src="https://wallpaperaccess.com/full/6367121.jpg"
                alt="Students learning online"
                fill
                style={{ objectFit: "cover" }}
              />
            </Box>
          </motion.div>
        </Box>



      </motion.div>

  
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
        <Box sx={{ mb: 10, textAlign: "center" }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
            Our Global Impact
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <Globe size={60} color="#1976d2" />
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {[
              { number: "11", label: "Active Learners" },
              { number: "1", label: "Countries" },
              { number: "29", label: "Courses" },
              { number: "3", label: "Expert Instructors" },
            ].map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <Card sx={{ py: 3, borderRadius: "12px", boxShadow: 2 }}>
                    <CardContent>
                      <Typography variant="h3" component="p" sx={{ fontWeight: "bold", color: "primary.main" }}>
                        {stat.number}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>

     
     
    </Container>


    
  )
}

