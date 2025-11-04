import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'
import { addProductAsync, resetProductAddStatus, selectProductAddStatus,updateProductByIdAsync } from '../../products/ProductSlice'
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useForm } from "react-hook-form"
import { fetchAllBrandsAsync, selectBrands } from '../../brands/BrandSlice'
import { fetchAllCategoriesAsync, selectCategories } from '../../categories/CategoriesSlice'
import { toast } from 'react-toastify'
import imageCompression from 'browser-image-compression';

// Helper function to convert file to Base64 and compress if needed
const convertToBase64 = async (file) => {
    const MAX_FILE_SIZE_MB = 1; // Define max file size for compression
    let compressedFile = file;
    let originalSize = file.size / (1024 * 1024); // in MB

    if (originalSize > MAX_FILE_SIZE_MB) {
        try {
            const options = {
                maxSizeMB: MAX_FILE_SIZE_MB,
                maxWidthOrHeight: 1920, // Max width/height for compressed image
                useWebWorker: true,
            };
            compressedFile = await imageCompression(file, options);
            console.log(`Image compressed from ${originalSize.toFixed(2)}MB to ${(compressedFile.size / (1024 * 1024)).toFixed(2)}MB`);
        } catch (error) {
            console.error('Image compression error:', error);
            toast.error('Failed to compress image. Uploading original.');
            compressedFile = file; // Fallback to original if compression fails
        }
    }

    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(compressedFile);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

export const AddProduct = () => {

    const {register,handleSubmit,reset,formState: { errors }} = useForm()

    const dispatch=useDispatch()
    const brands=useSelector(selectBrands)
    const categories=useSelector(selectCategories)
    const productAddStatus=useSelector(selectProductAddStatus)
    const navigate=useNavigate()
    const theme=useTheme()
    const is1100=useMediaQuery(theme.breakpoints.down(1100))
    const is480=useMediaQuery(theme.breakpoints.down(480))

    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false); // New state for confirmation
    const [pendingProductData, setPendingProductData] = useState(null); // To store data before confirmation

    useEffect(() => {
        dispatch(fetchAllBrandsAsync());
        dispatch(fetchAllCategoriesAsync());
    }, [dispatch]);

    useEffect(()=>{
        if(productAddStatus === 'fulfilled'){
            reset();
            setThumbnailFile(null);
            setThumbnailPreview('');
            setImageFiles([]);
            setImagePreviews([]);
            setPendingProductData(null);
            toast.success("New product added");
            navigate("/admin/dashboard");
        }
        else if(productAddStatus === 'rejected'){
            toast.error("Error adding product, please try again later");
        }
    },[productAddStatus, reset, navigate]);

    useEffect(()=>{
        return ()=>{
            dispatch(resetProductAddStatus());
        }
    },[dispatch]);

    const handleThumbnailChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnailFile(file);
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 4) {
            toast.error("You can upload a maximum of 4 images.");
            return;
        }
        setImageFiles(files);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleAddProduct = async (data) => {
        if (!thumbnailFile) {
            toast.error("Thumbnail is required.");
            return;
        }
        if (imageFiles.length === 0) {
            toast.error("At least one product image is required.");
            return;
        }

        const newProduct = { ...data };
        let compressionOccurred = false;

        // Convert thumbnail to Base64 (and compress if large)
        const processedThumbnail = await convertToBase64(thumbnailFile);
        if (processedThumbnail !== await new Promise(resolve => { const fr = new FileReader(); fr.onload = () => resolve(fr.result); fr.readAsDataURL(thumbnailFile); })) {
            compressionOccurred = true;
        }
        newProduct.thumbnail = processedThumbnail;

        // Convert product images to Base64 (and compress if large)
        const processedImages = await Promise.all(imageFiles.map(async file => {
            const processed = await convertToBase64(file);
            if (processed !== await new Promise(resolve => { const fr = new FileReader(); fr.onload = () => resolve(fr.result); fr.readAsDataURL(file); })) {
                compressionOccurred = true;
            }
            return processed;
        }));
        newProduct.images = processedImages;

        setPendingProductData(newProduct);

        if (compressionOccurred) {
            setShowConfirmation(true);
        } else {
            dispatch(addProductAsync(newProduct));
        }
    };

    const confirmUpload = () => {
        if (pendingProductData) {
            dispatch(addProductAsync(pendingProductData));
        }
        setShowConfirmation(false);
        setPendingProductData(null);
    };

    const cancelUpload = () => {
        setShowConfirmation(false);
        setPendingProductData(null);
        toast.info("Image upload cancelled by admin.");
    };

    return (
        <Stack p={'0 16px'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'} >
            <Stack width={is1100?"100%":"60rem"} rowGap={4} mt={is480?4:6} mb={6} component={'form'} noValidate onSubmit={handleSubmit(handleAddProduct)}> 
                {/* feild area */}
                <Stack rowGap={3}>
                    <Stack>
                        <Typography variant='h6' fontWeight={400} gutterBottom>Title</Typography>
                        <TextField {...register("title",{required:'Title is required'})}/>
                    </Stack> 

                    <Stack flexDirection={'row'} >
                        <FormControl fullWidth>
                            <InputLabel id="brand-selection">Brand</InputLabel>
                            <Select {...register("brand",{required:"Brand is required"})} labelId="brand-selection" label="Brand">
                                {
                                    brands.map((brand)=>(
                                        <MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="category-selection">Category</InputLabel>
                            <Select {...register("category",{required:"category is required"})} labelId="category-selection" label="Category">
                                {
                                    categories.map((category)=>(
                                        <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Stack>

                    <Stack>
                        <Typography variant='h6' fontWeight={400}  gutterBottom>Description</Typography>
                        <TextField multiline rows={4} {...register("description",{required:"Description is required"})}/>
                    </Stack>

                    <Stack flexDirection={'row'}>
                        <Stack flex={1}>
                            <Typography variant='h6' fontWeight={400}  gutterBottom>Price</Typography>
                            <TextField type='number' {...register("price",{required:"Price is required"})}/>
                        </Stack>
                        <Stack flex={1}>
                            <Typography variant='h6' fontWeight={400}  gutterBottom>Discount {is480?"%":"Percentage"}</Typography>
                            <TextField type='number' {...register("discountPercentage",{required:"discount percentage is required"})}/>
                        </Stack>
                    </Stack>

                    <Stack>
                        <Typography variant='h6'  fontWeight={400} gutterBottom>Stock Quantity</Typography>
                        <TextField type='number' {...register("stockQuantity",{required:"Stock Quantity is required"})}/>
                    </Stack>
                    
                    {/* Thumbnail Upload */}
                    <Stack>
                        <Typography variant='h6' fontWeight={400} gutterBottom>Thumbnail Image</Typography>
                        <input type="file" accept="image/*" onChange={handleThumbnailChange} />
                        {thumbnailPreview && (
                            <img src={thumbnailPreview} alt="Thumbnail Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }} />
                        )}
                    </Stack>

                    {/* Product Images Upload */}
                    <Stack>
                        <Typography variant='h6' fontWeight={400} gutterBottom>Product Images (Max 4)</Typography>
                        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
                        <Stack flexDirection="row" flexWrap="wrap" gap={2} mt={2}>
                            {imagePreviews.map((preview, index) => (
                                <img key={index} src={preview} alt={`Product Image ${index + 1} Preview`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                            ))}
                        </Stack>
                    </Stack>
                </Stack>

                {/* action area */}
                <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480?1:2}>
                    <Button size={is480?'medium':'large'} variant='contained' type='submit'>Add Product</Button>
                    <Button size={is480?'medium':'large'} variant='outlined' color='error' component={Link} to={'/admin/dashboard'}>Cancel</Button>
                </Stack>
            </Stack>

            {/* Confirmation Dialog */}
            <Dialog
                open={showConfirmation}
                onClose={cancelUpload}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Image Compression Applied"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Some of your images were large and have been compressed to optimize upload speed and storage.
                        Do you want to proceed with uploading the compressed images?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelUpload} color="error">
                        Cancel
                    </Button>
                    <Button onClick={confirmUpload} autoFocus>
                        Proceed
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};
