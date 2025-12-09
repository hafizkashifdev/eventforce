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
  TextField,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { useState } from 'react';
import api from '../../../lib/api';

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

export default function PaymentsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [refundAmount, setRefundAmount] = useState('');
  const [refundReason, setRefundReason] = useState('');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['payments', page, limit],
    queryFn: async () => {
      const response = await api.get(`/payments?page=${page}&limit=${limit}`);
      return response.data;
    },
  });

  const handleRefundPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setRefundAmount(payment.amountCents.toString());
    setRefundReason('');
    setRefundDialogOpen(true);
  };

  const handleProcessRefund = async () => {
    if (!selectedPayment) return;

    try {
      await api.post('/payments/refund', {
        paymentId: selectedPayment.id,
        refundAmountCents: refundAmount ? parseInt(refundAmount) : undefined,
        refundReason: refundReason || undefined,
      });
      setRefundDialogOpen(false);
      refetch();
    } catch (error) {
      console.error('Failed to process refund:', error);
    }
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
        Failed to load payments. Please try again.
      </Alert>
    );
  }

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
