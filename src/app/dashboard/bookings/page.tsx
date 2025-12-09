'use client';

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

// Static mock data
const mockBookings: Booking[] = [
  {
    id: '1',
    userId: 'user1',
    vehicleId: 'vehicle1',
    startAt: new Date().toISOString(),
    endAt: new Date(Date.now() + 86400000).toISOString(),
    totalCents: 50000,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    user: { id: 'user1', email: 'ahmed@example.com', name: 'Ahmed Ali' },
    vehicle: { id: 'vehicle1', name: 'Mercedes S-Class' },
  },
  {
    id: '2',
    userId: 'user2',
    vehicleId: 'vehicle2',
    startAt: new Date().toISOString(),
    endAt: new Date(Date.now() + 86400000).toISOString(),
    totalCents: 30000,
    status: 'CONFIRMED',
    createdAt: new Date().toISOString(),
    user: { id: 'user2', email: 'sarah@example.com', name: 'Sarah Khan' },
    vehicle: { id: 'vehicle2', name: 'BMW 5 Series' },
  },
  {
    id: '3',
    userId: 'user3',
    vehicleId: 'vehicle3',
    startAt: new Date().toISOString(),
    endAt: new Date(Date.now() + 86400000).toISOString(),
    totalCents: 150000,
    status: 'COMPLETED',
    createdAt: new Date().toISOString(),
    user: { id: 'user3', email: 'mohammed@example.com', name: 'Mohammed Hassan' },
    vehicle: { id: 'vehicle3', name: 'Toyota Coaster' },
  },
];

export default function BookingsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'>('PENDING');
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  const data = {
    bookings: bookings.slice((page - 1) * limit, page * limit),
    total: bookings.length,
  };

  const handleStatusChange = (booking: Booking) => {
    setSelectedBooking(booking);
    setNewStatus(booking.status);
    setStatusDialogOpen(true);
  };

  const handleSaveStatus = () => {
    if (!selectedBooking) return;
    setBookings(prev => prev.map(b => 
      b.id === selectedBooking.id ? { ...b, status: newStatus } : b
    ));
    setStatusDialogOpen(false);
  };

  const handleConfirmBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status: 'CONFIRMED' } : b
    ));
  };

  const handleCompleteBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status: 'COMPLETED' } : b
    ));
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
