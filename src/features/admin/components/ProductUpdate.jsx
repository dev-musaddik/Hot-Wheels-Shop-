import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { clearSelectedProduct, fetchProductByIdAsync,resetProductUpdateStatus, selectProductUpdateStatus, selectSelectedProduct, updateProductByIdAsync } from '../../products/ProductSlice'
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useForm } from "react-hook-form"
import { fetchAllBrandsAsync, selectBrands } from '../../brands/BrandSlice'
import { fetchAllCategoriesAsync, selectCategories } from '../../categories/CategoriesSlice'
import { toast } from 'react-toastify'

// Helper function to convert file to Base64
const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

export const ProductUpdate = () => {

    const {register,handleSubmit,watch,formState: { errors }} = useForm()

    const {id}=useParams()
    const dispatch=useDispatch()
    const selectedProduct=useSelector(selectSelectedProduct)
    const brands=useSelector(selectBrands)
    const categories=useSelector(selectCategories)
    const productUpdateStatus=useSelector(selectProductUpdateStatus)
    const navigate=useNavigate()
    const theme=useTheme()
    const is1100=useMediaQuery(theme.breakpoints.down(1100))
    const is480=useMediaQuery(theme.breakpoints.down(480))

    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {
        dispatch(fetchAllBrandsAsync());
        dispatch(fetchAllCategoriesAsync());
    }, [dispatch]);

    useEffect(()=>{
        if(id){
            dispatch(fetchProductByIdAsync(id))
        }
    },[id])

    useEffect(() => {
        if (selectedProduct) {
            // Set initial previews for existing images
            setThumbnailPreview(selectedProduct.thumbnail || '');
            setImagePreviews(selectedProduct.images || []);
        }
    }, [selectedProduct]);

    useEffect(()=>{
        if(productUpdateStatus==='fullfilled'){
            toast.success("Product Updated")
            navigate("/admin/dashboard")
        }
        else if(productUpdateStatus==='rejected'){
            toast.error("Error updating product, please try again later")
        }
    },[productUpdateStatus])

    useEffect(()=>{
        return ()=>{
            dispatch(clearSelectedProduct())
            dispatch(resetProductUpdateStatus())
        }
    },[])

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

    const handleProductUpdate=async(data)=>{
        const productUpdate={...data,_id:selectedProduct._id};

        // Handle thumbnail update
        if (thumbnailFile) {
            productUpdate.thumbnail = await convertToBase64(thumbnailFile);
        } else {
            productUpdate.thumbnail = selectedProduct.thumbnail; // Keep existing if not changed
        }

        // Handle product images update
        if (imageFiles.length > 0) {
            productUpdate.images = await Promise.all(imageFiles.map(file => convertToBase64(file)));
        } else {
            productUpdate.images = selectedProduct.images; // Keep existing if not changed
        }

        dispatch(updateProductByIdAsync(productUpdate))
    }


  return (
    <Stack p={'0 16px'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'} >
        
        {
            selectedProduct &&
        
        <Stack width={is1100?"100%":"60rem"} rowGap={4} mt={is480?4:6} mb={6} component={'form'} noValidate onSubmit={handleSubmit(handleProductUpdate)}> 
            
            {/* feild area */}
            <Stack rowGap={3}>
                <Stack>
                    <Typography variant='h6' fontWeight={400} gutterBottom>Title</Typography>
                    <TextField {...register("title",{required:'Title is required',value:selectedProduct.title})}/>
                </Stack> 

                <Stack flexDirection={'row'} >

                    <FormControl fullWidth>
                        <InputLabel id="brand-selection">Brand</InputLabel>
                        <Select defaultValue={selectedProduct.brand._id} {...register("brand",{required:"Brand is required"})} labelId="brand-selection" label="Brand">
                            
                            {
                                brands.map((brand)=>(
                                    <MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>
                                ))
                            }

                        </Select>
                    </FormControl>


                    <FormControl fullWidth>
                        <InputLabel id="category-selection">Category</InputLabel>
                        <Select defaultValue={selectedProduct.category._id} {...register("category",{required:"category is required"})} labelId="category-selection" label="Category">
                            
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
                    <TextField multiline rows={4} {...register("description",{required:"Description is required",value:selectedProduct.description})}/>
                </Stack>

                <Stack flexDirection={'row'}>
                    <Stack flex={1}>
                        <Typography variant='h6' fontWeight={400}  gutterBottom>Price</Typography>
                        <TextField type='number' {...register("price",{required:"Price is required",value:selectedProduct.price})}/>
                    </Stack>
                    <Stack flex={1}>
                        <Typography variant='h6' fontWeight={400}  gutterBottom>Discount {is480?"%":"Percentage"}</Typography>
                        <TextField type='number' {...register("discountPercentage",{required:"discount percentage is required",value:selectedProduct.discountPercentage})}/>
                    </Stack>
                </Stack>

                <Stack>
                    <Typography variant='h6'  fontWeight={400} gutterBottom>Stock Quantity</Typography>
                    <TextField type='number' {...register("stockQuantity",{required:"Stock Quantity is required",value:selectedProduct.stockQuantity})}/>
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
                <Button size={is480?'medium':'large'} variant='contained' type='submit'>Update</Button>
                <Button size={is480?'medium':'large'} variant='outlined' color='error' component={Link} to={'/admin/dashboard'}>Cancel</Button>
            </Stack>


        </Stack>
        }

    </Stack>
  )
}
