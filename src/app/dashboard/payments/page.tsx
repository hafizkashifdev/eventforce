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
  TextField,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { useState } from 'react';

interface Payment {
  id: string;
  bookingId?: string;
  amountCents: number;
  currency: string;
  stripePaymentIntent?: string;
  status: string;
  createdAt: string;
  booking?: {
    id: string;
    user: {
      id: string;
      email: string;
      name?: string;
    };
    vehicle: {
      id: string;
      name: string;
    };
  };
}

// Static mock data
const mockPayments: Payment[] = [
  {
    id: '1',
    bookingId: 'booking1',
    amountCents: 50000,
    currency: 'USD',
    status: 'COMPLETED',
    createdAt: new Date().toISOString(),
    booking: {
      id: 'booking1',
      user: { id: 'user1', email: 'ahmed@example.com', name: 'Ahmed Ali' },
      vehicle: { id: 'vehicle1', name: 'Mercedes S-Class' },
    },
  },
  {
    id: '2',
    bookingId: 'booking2',
    amountCents: 30000,
    currency: 'USD',
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    booking: {
      id: 'booking2',
      user: { id: 'user2', email: 'sarah@example.com', name: 'Sarah Khan' },
      vehicle: { id: 'vehicle2', name: 'BMW 5 Series' },
    },
  },
];

export default function PaymentsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [refundAmount, setRefundAmount] = useState('');
  const [refundReason, setRefundReason] = useState('');
  const [payments, setPayments] = useState<Payment[]>(mockPayments);

  const data = {
    payments: payments.slice((page - 1) * limit, page * limit),
    total: payments.length,
  };

  const handleRefundPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setRefundAmount(payment.amountCents.toString());
    setRefundReason('');
    setRefundDialogOpen(true);
  };

  const handleProcessRefund = () => {
    if (!selectedPayment) return;
    // Update payment status to refunded
    setPayments(prev => prev.map(p => 
      p.id === selectedPayment.id ? { ...p, status: 'REFUNDED' } : p
    ));
    setRefundDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      case 'refunded':
        return 'info';
      case 'partially_refunded':
        return 'info';
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

  const totalRevenue = data?.payments?.reduce((sum: number, payment: Payment) => {
    return payment.status === 'succeeded' ? sum + payment.amountCents : sum;
  }, 0) || 0;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Payments Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total: {data?.total || 0} payments
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{xs:12, sm:6, md:3}}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Revenue
              </Typography>
              <Typography variant="h4">
                {formatCurrency(totalRevenue)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{xs:12, sm:6, md:3}}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Successful Payments
              </Typography>
              <Typography variant="h4">
                {data?.payments?.filter((p: Payment) => p.status === 'succeeded').length || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{xs:12, sm:6, md:3}}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Payments
              </Typography>
              <Typography variant="h4">
                {data?.payments?.filter((p: Payment) => p.status === 'pending').length || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{xs:12, sm:6, md:3}}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Failed Payments
              </Typography>
              <Typography variant="h4">
                {data?.payments?.filter((p: Payment) => p.status === 'failed').length || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment Intent</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.payments?.map((payment: Payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  {payment.booking?.user?.name || payment.booking?.user?.email || 'N/A'}
                </TableCell>
                <TableCell>
                  {payment.booking?.vehicle?.name || 'N/A'}
                </TableCell>
                <TableCell>{formatCurrency(payment.amountCents)}</TableCell>
                <TableCell>
                  <Chip
                    label={payment.status}
                    color={getStatusColor(payment.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {payment.stripePaymentIntent ? (
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {payment.stripePaymentIntent.substring(0, 20)}...
                    </Typography>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  {new Date(payment.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {payment.status === 'succeeded' && (
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleRefundPayment(payment)}
                    >
                      Refund
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Refund Dialog */}
      <Dialog open={refundDialogOpen} onClose={() => setRefundDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Refund Payment</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom>
              Refunding payment of {formatCurrency(selectedPayment?.amountCents || 0)}
            </Typography>
            <TextField
              fullWidth
              label="Refund Amount (cents)"
              type="number"
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
              helperText="Leave empty for full refund"
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Refund Reason"
              multiline
              rows={3}
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRefundDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleProcessRefund} variant="contained" color="error">
            Process Refund
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
