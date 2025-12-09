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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  role: 'CUSTOMER' | 'STAFF' | 'ADMIN';
  isVerified: boolean;
  createdAt: string;
}

// Static mock data
const mockUsers: User[] = [
  { id: '1', email: 'admin@eventforce.com', name: 'Admin User', role: 'ADMIN', isVerified: true, createdAt: new Date().toISOString() },
  { id: '2', email: 'staff@eventforce.com', name: 'Staff User', role: 'STAFF', isVerified: true, createdAt: new Date().toISOString() },
  { id: '3', email: 'customer1@example.com', name: 'Ahmed Ali', role: 'CUSTOMER', isVerified: true, createdAt: new Date().toISOString() },
  { id: '4', email: 'customer2@example.com', name: 'Sarah Khan', role: 'CUSTOMER', isVerified: false, createdAt: new Date().toISOString() },
];

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    role: 'CUSTOMER' as 'CUSTOMER' | 'STAFF' | 'ADMIN',
  });
  const [users, setUsers] = useState<User[]>(mockUsers);

  const data = {
    users: users.slice((page - 1) * limit, page * limit),
    total: users.length,
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name || '',
      role: user.role,
    });
    setEditDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (!selectedUser) return;
    setUsers(prev => prev.map(u => 
      u.id === selectedUser.id ? { ...u, ...editForm } : u
    ));
    setEditDialogOpen(false);
  };

  const handleDeleteUser = (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'error';
      case 'STAFF':
        return 'warning';
      case 'CUSTOMER':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Users Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total: {data?.total || 0} users
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.users?.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell>{user.name || 'N/A'}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    color={getRoleColor(user.role)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.isVerified ? 'Yes' : 'No'}
                    color={user.isVerified ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={editForm.role}
              label="Role"
              onChange={(e) => setEditForm({ ...editForm, role: e.target.value as any })}
            >
              <MenuItem value="CUSTOMER">Customer</MenuItem>
              <MenuItem value="STAFF">Staff</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveUser} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
