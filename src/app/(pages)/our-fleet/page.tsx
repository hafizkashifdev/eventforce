import React from 'react'
import { Box } from '@mui/material'
import Header from '@/components/Header'
import FleetPage from '@/components/FleetPage'
import Footer from '@/components/Footer'

const OurFleetPage = () => {
    return (
        <>
            <Header />
            <Box sx={{ pt: 12 }}>
                <FleetPage />
            </Box>
            <Footer />
        </>
    )
}

export default OurFleetPage