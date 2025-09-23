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
  Chip,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import api from '../../../lib/api';

interface Booking {
  id: string;
  userId: string;
  vehicleId: string;
  startAt: string;
  endAt: string;
  totalCents: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED';
  createdAt: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
  vehicle: {
    id: string;
    name: string;
  };
}

export default function BookingsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'>('PENDING');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['bookings', page, limit],
    queryFn: async () => {
      const response = await api.get(`/bookings?page=${page}&limit=${limit}`);
      return response.data;
    },
  });

  const handleStatusChange = (booking: Booking) => {
    setSelectedBooking(booking);
    setNewStatus(booking.status);
    setStatusDialogOpen(true);
  };

  const handleSaveStatus = async () => {
    if (!selectedBooking) return;

    try {
      await api.patch(`/bookings/${selectedBooking.id}`, { status: newStatus });
      setStatusDialogOpen(false);
      refetch();
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
  };

  const handleConfirmBooking = async (bookingId: string) => {
    try {
      await api.post(`/bookings/${bookingId}/confirm`);
      refetch();
    } catch (error) {
      console.error('Failed to confirm booking:', error);
    }
  };

  const handleCompleteBooking = async (bookingId: string) => {
    try {
      await api.post(`/bookings/${bookingId}/complete`);
      refetch();
    } catch (error) {
      console.error('Failed to complete booking:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'CONFIRMED':
        return 'info';
      case 'COMPLETED':
        return 'success';
      case 'CANCELED':
        return 'error';
      default:
        return 'default';
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
        Failed to load bookings. Please try again.
      </Alert>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Bookings Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total: {data?.total || 0} bookings
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.bookings?.map((booking: Booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  {booking.user?.name || booking.user?.email}
                </TableCell>
                <TableCell>{booking.vehicle?.name}</TableCell>
                <TableCell>
                  {new Date(booking.startAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(booking.endAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{formatCurrency(booking.totalCents)}</TableCell>
                <TableCell>
                  <Chip
                    label={booking.status}
                    color={getStatusColor(booking.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(booking.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      size="small"
                      onClick={() => handleStatusChange(booking)}
                    >
                      Change Status
                    </Button>
                    {booking.status === 'PENDING' && (
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => handleConfirmBooking(booking.id)}
                      >
                        Confirm
                      </Button>
                    )}
                    {booking.status === 'CONFIRMED' && (
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => handleCompleteBooking(booking.id)}
                      >
                        Complete
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Status Change Dialog */}
      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Booking Status</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={newStatus}
              label="Status"
              onChange={(e) => setNewStatus(e.target.value as any)}
            >
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="CONFIRMED">Confirmed</MenuItem>
              <MenuItem value="CANCELED">Canceled</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveStatus} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
