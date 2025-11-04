import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllBrandsAsync,
    selectBrands,
    selectBrandUpdateStatus,
    selectBrandDeleteStatus,
    updateBrandAsync,
    deleteBrandAsync,
    resetBrandUpdateStatus,
    resetBrandDeleteStatus,
    selectBrandErrors
} from '../../brands/BrandSlice';
import {
    fetchAllCategoriesAsync,
    selectCategories,
    selectCategoryUpdateStatus,
    selectCategoryDeleteStatus,
    updateCategoryAsync,
    deleteCategoryAsync,
    resetCategoryUpdateStatus,
    resetCategoryDeleteStatus,
    selectCategoryErrors
} from '../../categories/CategoriesSlice';
import {
    Stack,
    Typography,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Paper,
    useMediaQuery,
    useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';

export const AdminBrandCategory = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const is480 = useMediaQuery(theme.breakpoints.down(480));

    const brands = useSelector(selectBrands);
    const categories = useSelector(selectCategories);

    const brandUpdateStatus = useSelector(selectBrandUpdateStatus);
    const brandDeleteStatus = useSelector(selectBrandDeleteStatus);
    const brandErrors = useSelector(selectBrandErrors);

    const categoryUpdateStatus = useSelector(selectCategoryUpdateStatus);
    const categoryDeleteStatus = useSelector(selectCategoryDeleteStatus);
    const categoryErrors = useSelector(selectCategoryErrors);

    const [editingBrandId, setEditingBrandId] = useState(null);
    const [editingBrandName, setEditingBrandName] = useState('');
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingCategoryName, setEditingCategoryName] = useState('');

    useEffect(() => {
        dispatch(fetchAllBrandsAsync());
        dispatch(fetchAllCategoriesAsync());
    }, [dispatch]);

    // Brand Toast Notifications
    useEffect(() => {
        if (brandUpdateStatus === 'fulfilled') {
            toast.success('Brand updated successfully!');
            setEditingBrandId(null);
            setEditingBrandName('');
            dispatch(resetBrandUpdateStatus());
        } else if (brandUpdateStatus === 'rejected') {
            toast.error(brandErrors?.message || 'Failed to update brand.');
            dispatch(resetBrandUpdateStatus());
        }
    }, [brandUpdateStatus, brandErrors, dispatch]);

    useEffect(() => {
        if (brandDeleteStatus === 'fulfilled') {
            toast.success('Brand deleted successfully!');
            dispatch(resetBrandDeleteStatus());
        } else if (brandDeleteStatus === 'rejected') {
            toast.error(brandErrors?.message || 'Failed to delete brand.');
            dispatch(resetBrandDeleteStatus());
        }
    }, [brandDeleteStatus, brandErrors, dispatch]);

    // Category Toast Notifications
    useEffect(() => {
        if (categoryUpdateStatus === 'fulfilled') {
            toast.success('Category updated successfully!');
            setEditingCategoryId(null);
            setEditingCategoryName('');
            dispatch(resetCategoryUpdateStatus());
        } else if (categoryUpdateStatus === 'rejected') {
            toast.error(categoryErrors?.message || 'Failed to update category.');
            dispatch(resetCategoryUpdateStatus());
        }
    }, [categoryUpdateStatus, categoryErrors, dispatch]);

    useEffect(() => {
        if (categoryDeleteStatus === 'fulfilled') {
            toast.success('Category deleted successfully!');
            dispatch(resetCategoryDeleteStatus());
        } else if (categoryDeleteStatus === 'rejected') {
            toast.error(categoryErrors?.message || 'Failed to delete category.');
            dispatch(resetCategoryDeleteStatus());
        }
    }, [categoryDeleteStatus, categoryErrors, dispatch]);

    const handleEditBrand = (brand) => {
        setEditingBrandId(brand._id);
        setEditingBrandName(brand.name);
    };

    const handleSaveBrand = () => {
        if (editingBrandName.trim() === '') {
            toast.error('Brand name cannot be empty.');
            return;
        }
        dispatch(updateBrandAsync({ _id: editingBrandId, name: editingBrandName }));
    };

    const handleCancelEditBrand = () => {
        setEditingBrandId(null);
        setEditingBrandName('');
    };

    const handleDeleteBrand = (id) => {
        dispatch(deleteBrandAsync(id));
    };

    const handleEditCategory = (category) => {
        setEditingCategoryId(category._id);
        setEditingCategoryName(category.name);
    };

    const handleSaveCategory = () => {
        if (editingCategoryName.trim() === '') {
            toast.error('Category name cannot be empty.');
            return;
        }
        dispatch(updateCategoryAsync({ _id: editingCategoryId, name: editingCategoryName }));
    };

    const handleCancelEditCategory = () => {
        setEditingCategoryId(null);
        setEditingCategoryName('');
    };

    const handleDeleteCategory = (id) => {
        dispatch(deleteCategoryAsync(id));
    };

    return (
        <Stack p={is480 ? '16px' : '32px'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} rowGap={5}>
            <Typography variant='h4' fontWeight={600}>Manage Brands & Categories</Typography>

            <Stack direction={is480 ? 'column' : 'row'} spacing={4} width={'100%'} maxWidth={'900px'}>
                {/* Brands Section */}
                <Paper elevation={3} sx={{ flex: 1, padding: 2, borderRadius: '8px' }}>
                    <Typography variant='h5' gutterBottom>Brands</Typography>
                    <List>
                        {brands.map((brand) => (
                            <ListItem
                                key={brand._id}
                                secondaryAction={
                                    editingBrandId === brand._id ? (
                                        <Stack direction="row" spacing={1}>
                                            <LoadingButton
                                                loading={brandUpdateStatus === 'pending'}
                                                onClick={handleSaveBrand}
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                            >
                                                <CheckIcon fontSize="small" />
                                            </LoadingButton>
                                            <IconButton onClick={handleCancelEditBrand} size="small" color="error">
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    ) : (
                                        <Stack direction="row" spacing={1}>
                                            <IconButton edge="end" aria-label="edit" onClick={() => handleEditBrand(brand)} size="small">
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <LoadingButton
                                                loading={brandDeleteStatus === 'pending'}
                                                onClick={() => handleDeleteBrand(brand._id)}
                                                size="small"
                                                color="error"
                                                variant="outlined"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </LoadingButton>
                                        </Stack>
                                    )
                                }
                            >
                                {editingBrandId === brand._id ? (
                                    <TextField
                                        value={editingBrandName}
                                        onChange={(e) => setEditingBrandName(e.target.value)}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                    />
                                ) : (
                                    <ListItemText primary={brand.name} />
                                )}
                            </ListItem>
                        ))}
                    </List>
                </Paper>

                {/* Categories Section */}
                <Paper elevation={3} sx={{ flex: 1, padding: 2, borderRadius: '8px' }}>
                    <Typography variant='h5' gutterBottom>Categories</Typography>
                    <List>
                        {categories.map((category) => (
                            <ListItem
                                key={category._id}
                                secondaryAction={
                                    editingCategoryId === category._id ? (
                                        <Stack direction="row" spacing={1}>
                                            <LoadingButton
                                                loading={categoryUpdateStatus === 'pending'}
                                                onClick={handleSaveCategory}
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                            >
                                                <CheckIcon fontSize="small" />
                                            </LoadingButton>
                                            <IconButton onClick={handleCancelEditCategory} size="small" color="error">
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    ) : (
                                        <Stack direction="row" spacing={1}>
                                            <IconButton edge="end" aria-label="edit" onClick={() => handleEditCategory(category)} size="small">
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <LoadingButton
                                                loading={categoryDeleteStatus === 'pending'}
                                                onClick={() => handleDeleteCategory(category._id)}
                                                size="small"
                                                color="error"n
                                                variant="outlined"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </LoadingButton>
                                        </Stack>
                                    )
                                }
                            >
                                {editingCategoryId === category._id ? (
                                    <TextField
                                        value={editingCategoryName}
                                        onChange={(e) => setEditingCategoryName(e.target.value)}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                    />
                                ) : (
                                    <ListItemText primary={category.name} />
                                )}
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Stack>
        </Stack>
    );
};