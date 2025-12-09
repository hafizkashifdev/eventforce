'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useState } from 'react';
import api from '../../../lib/api';

interface Vehicle {
  id: string;
  name: string;
  description?: string;
  seats?: number;
  priceCents: number;
  createdAt: string;
  updatedAt: string;
}

export default function VehiclesPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    seats: '',
    priceCents: '',
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['vehicles', page, limit],
    queryFn: async () => {
      const response = await api.get(`/vehicles?page=${page}&limit=${limit}`);
      return response.data;
    },
  });

  const handleAddVehicle = () => {
    setFormData({
      name: '',
      description: '',
      seats: '',
      priceCents: '',
    });
    setAddDialogOpen(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      description: vehicle.description || '',
      seats: vehicle.seats?.toString() || '',
      priceCents: vehicle.priceCents.toString(),
    });
    setEditDialogOpen(true);
  };

  const handleSaveVehicle = async () => {
    try {
      const payload = {
        name: formData.name,
        description: formData.description || undefined,
        seats: formData.seats ? parseInt(formData.seats) : undefined,
        priceCents: parseInt(formData.priceCents),
      };

      if (selectedVehicle) {
        await api.patch(`/vehicles/${selectedVehicle.id}`, payload);
      } else {
        await api.post('/vehicles', payload);
      }

      setAddDialogOpen(false);
      setEditDialogOpen(false);
      refetch();
    } catch (error) {
      console.error('Failed to save vehicle:', error);
    }
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;

    try {
      await api.delete(`/vehicles/${vehicleId}`);
      refetch();
    } catch (error) {
      console.error('Failed to delete vehicle:', error);
    }
  };

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Failed to load vehicles. Please try again.
      </Alert>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Vehicles Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddVehicle}
        >
          Add Vehicle
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{xs:12, sm:6, md:3}}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Vehicles
              </Typography>
              <Typography variant="h4">
                {data?.total || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Seats</TableCell>
              <TableCell>Price per Hour</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.vehicles?.map((vehicle: Vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.name}</TableCell>
                <TableCell>{vehicle.description || 'N/A'}</TableCell>
                <TableCell>{vehicle.seats || 'N/A'}</TableCell>
                <TableCell>{formatCurrency(vehicle.priceCents)}</TableCell>
                <TableCell>
                  {new Date(vehicle.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      size="small"
                      onClick={() => handleEditVehicle(vehicle)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Vehicle Dialog */}
      <Dialog 
        open={addDialogOpen || editDialogOpen} 
        onClose={() => {
          setAddDialogOpen(false);
          setEditDialogOpen(false);
        }} 
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>
          {selectedVehicle ? 'Edit Vehicle' : 'Add Vehicle'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
             <Grid size={6}>
              <TextField
                fullWidth
                label="Seats"
                type="number"
                value={formData.seats}
                onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
              />
            </Grid>
             <Grid size={6}>
              <TextField
                fullWidth
                label="Price per Hour (cents)"
                type="number"
                value={formData.priceCents}
                onChange={(e) => setFormData({ ...formData, priceCents: e.target.value })}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setAddDialogOpen(false);
            setEditDialogOpen(false);
          }}>
            Cancel
          </Button>
          <Button onClick={handleSaveVehicle} variant="contained">
            {selectedVehicle ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
