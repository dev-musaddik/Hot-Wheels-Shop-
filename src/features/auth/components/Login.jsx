import {Box, FormHelperText, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import Lottie from 'lottie-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { ecommerceOutlookAnimation, shoppingBagAnimation} from '../../../assets'
import {useDispatch,useSelector} from 'react-redux'
import { LoadingButton } from '@mui/lab';
import {selectLoggedInUser,loginAsync,selectLoginStatus, selectLoginError, clearLoginError, resetLoginStatus} from '../AuthSlice'
import { toast } from 'react-toastify'
import {MotionConfig, motion} from 'framer-motion'
import HomeIcon from '@mui/icons-material/Home'
export const Login = () => {
  const dispatch=useDispatch()
  const status=useSelector(selectLoginStatus)
  const error=useSelector(selectLoginError)
  const loggedInUser=useSelector(selectLoggedInUser)
  const {register,handleSubmit,reset,formState: { errors }} = useForm()
  const navigate=useNavigate()
  const theme=useTheme()
  const is900=useMediaQuery(theme.breakpoints.down(900))
  const is480=useMediaQuery(theme.breakpoints.down(480))
  
  // handles user redirection
  // useEffect(()=>{
  //   if(loggedInUser && loggedInUser?.isVerified){
  //     navigate("/")
  //   }
  //   else if(loggedInUser && !loggedInUser?.isVerified){
  //     navigate("/verify-otp")
  //   }
  // },[loggedInUser])

  // handles login error and toast them
  useEffect(()=>{
    if(error){
      toast.error(error.message)
    }
  },[error])

  // handles login status and dispatches reset actions to relevant states in cleanup
  useEffect(()=>{
    if(status==='fullfilled' && loggedInUser?.isVerified===true){
      toast.success(`Login successful`)
      reset()
    }
    return ()=>{
      dispatch(clearLoginError())
      dispatch(resetLoginStatus())
    }
  },[status])

  const handleLogin=(data)=>{
    const cred={...data}
    delete cred.confirmPassword
    dispatch(loginAsync(cred))
  }

  return (
    <Stack width={'100vw'} height={'100vh'} flexDirection={'row'} sx={{overflowY:"hidden"}}>
        
        {
          !is900 && 
       
        <Stack bgcolor={'black'} flex={1} justifyContent={'center'} >
          <Lottie animationData={ecommerceOutlookAnimation}/>
        </Stack> 
        }
 {/* --- Back to Home Button --- */}
 <motion.div
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            style={{ position: "absolute", top: 30, left: 30 }}
          >
            <Stack
              component={Link}
              to="/"
              direction="row"
              alignItems="center"
              sx={{
                textDecoration: "none",
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
                padding: "8px 14px",
                borderRadius: "30px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                transition: "all .3s ease",
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                },
              }}
            >
              <HomeIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography sx={{ fontWeight: 600 }}>Back to Home</Typography>
            </Stack>
          </motion.div>
          {/* --- End Back Button --- */}
        <Stack flex={1} justifyContent={'center'} alignItems={'center'}>

              <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>

                <Stack rowGap={'.4rem'}>
                  <Typography variant='h2' sx={{wordBreak:"break-word"}} fontWeight={600}>Hot Wheels Shop</Typography>
                  <Typography alignSelf={'flex-end'} color={'GrayText'} variant='body2'>- Shop Anything</Typography>
                </Stack>

              </Stack>

                <Stack mt={4} spacing={2} width={is480?"95vw":'28rem'} component={'form'} noValidate onSubmit={handleSubmit(handleLogin)}>

                    <motion.div whileHover={{y:-5}}>
                      <TextField fullWidth {...register("email",{required:"Email is required",pattern:{value:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,message:"Enter a valid email"}})} placeholder='Email'/>
                      {errors.email && <FormHelperText sx={{mt:1}} error>{errors.email.message}</FormHelperText>}
                    </motion.div>

                    
                    <motion.div whileHover={{y:-5}}>
                      <TextField type='password' fullWidth {...register("password",{required:"Password is required"})} placeholder='Password'/>
                      {errors.password && <FormHelperText sx={{mt:1}} error>{errors.password.message}</FormHelperText>}
                    </motion.div>
                    
                    <motion.div whileHover={{scale:1.020}} whileTap={{scale:1}}>
                      <LoadingButton fullWidth  sx={{height:'2.5rem'}} loading={status==='pending'} type='submit' variant='contained'>Login</LoadingButton>
                    </motion.div>

                    <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap-reverse'} >

                      <MotionConfig whileHover={{x:2}} whileTap={{scale:1.050}}>
                          <motion.div>
                              <Typography mr={'1.5rem'} sx={{textDecoration:"none",color:"text.primary"}} to={'/forgot-password'} component={Link}>Forgot password</Typography>
                          </motion.div>

                          <motion.div>
                            <Typography sx={{textDecoration:"none",color:"text.primary"}} to={'/signup'} component={Link}>Don't have an account? <span style={{color:theme.palette.primary.dark}}>Register</span></Typography>
                          </motion.div>
                      </MotionConfig>

                    </Stack>

                </Stack>
        </Stack>
    </Stack>
  )
}
