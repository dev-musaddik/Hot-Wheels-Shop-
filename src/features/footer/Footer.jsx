import { Box, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Stack } from '@mui/material'
import React from 'react'
import { QRCodePng, appStorePng, googlePlayPng ,facebookPng,instagramPng,twitterPng,linkedinPng} from '../../assets'
import SendIcon from '@mui/icons-material/Send';
import { MotionConfig, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../auth/AuthSlice';



export const Footer = () => {

    const theme=useTheme()
    const is700=useMediaQuery(theme.breakpoints.down(700))
    const loggedInUser = useSelector(selectLoggedInUser);

    const labelStyles={
        fontWeight:300,
        cursor:'pointer',
        textDecoration: 'none',
        color: theme.palette.primary.light
    }

  return (
    <Stack sx={{backgroundColor:theme.palette.primary.main,paddingTop:"3rem",paddingLeft:is700?"1rem":"3rem",paddingRight:is700?"1rem":"3rem",paddingBottom:"1.5rem",rowGap:"5rem",color:theme.palette.primary.light,justifyContent:"space-around"}}>

            {/* upper */}
            <Stack flexDirection={'row'} rowGap={'1rem'} justifyContent={is700?"":'space-around'} flexWrap={'wrap'}>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6' fontSize={'1.5rem'}>Exclusive</Typography>
                    <Typography variant='h6'>Subscribe</Typography>
                    <Typography sx={labelStyles}>Get 10% off your first order</Typography>
                    <TextField placeholder='Enter your email' sx={{border:'1px solid white',borderRadius:"6px"}} InputProps={{endAdornment:<IconButton><SendIcon sx={{color:theme.palette.primary.light}}/></IconButton>,style:{color:"whitesmoke"}}}/>
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6'>Support</Typography>
                    <Typography sx={labelStyles}>11th Main Street, Dhaka,  DH 1515, California.</Typography>
                    <Typography sx={labelStyles}>your@gmail.com</Typography>
                    <Typography sx={labelStyles}>+8801xxxxxxxx</Typography>
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography  variant='h6'>Account</Typography>
                    <Typography as={Link} to={loggedInUser?.isAdmin ? '/admin/profile' : '/profile'} sx={labelStyles}>My Account</Typography>
                    <Typography as={Link} to="/login" sx={labelStyles}>Login / Register</Typography>
                    <Typography as={Link} to="/cart" sx={labelStyles}>Cart</Typography>
                    <Typography as={Link} to="/wishlist" sx={labelStyles}>Wishlist</Typography>
                    <Typography as={Link} to="/" sx={labelStyles}>Shop</Typography>
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography  variant='h6'>Quick Links</Typography>
                    <Typography as={Link} to="/privacy-policy" sx={labelStyles}>Privacy Policy</Typography>
                    <Typography as={Link} to="/terms-of-use" sx={labelStyles}>Terms Of Use</Typography>
                    <Typography as={Link} to="/faq" sx={labelStyles}>FAQ</Typography>
                    <Typography as={Link} to="/contact" sx={labelStyles}>Contact</Typography>
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography  variant='h6'>Download App</Typography>
                    <Typography sx={{...labelStyles,color:"graytext",fontWeight:500}}>Save $3 with App New User Only</Typography>
                    <Stack flexDirection={'row'} columnGap={'.5rem'}>

                        <Box width={'100px'} height={"100px"}>
                            <img src={QRCodePng} height={'100%'} width={'100%'} style={{objectFit:'contain'}} alt="QR Code"/>
                        </Box>

                        <Stack justifyContent={'space-around'}>
                            <Stack>
                                <img style={{width:"100%",height:"100%",cursor:"pointer"}} src={googlePlayPng} alt="GooglePlay" />
                            </Stack>
                            <Stack>
                                <img style={{width:"100%",height:'100%',cursor:"pointer"}} src={appStorePng} alt="AppStore" />
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack mt={.6} flexDirection={'row'} columnGap={'2rem'}>
                        <MotionConfig whileHover={{scale:1.1}} whileTap={{scale:1}}>
                            <motion.img style={{cursor:"pointer"}} src={facebookPng} alt="Facebook" />
                            <motion.img style={{cursor:"pointer"}} src={twitterPng} alt="Twitter" />
                            <motion.img style={{cursor:"pointer"}} src={instagramPng} alt="Instagram" />
                            <motion.img style={{cursor:"pointer"}} src={linkedinPng} alt="Linkedin" />
                        </MotionConfig>
                    </Stack>
                </Stack>

            </Stack>

            {/* lower */}
            <Stack alignSelf={"center"}>
                <Typography color={'GrayText'}>&copy; Hot Wheels Store {new Date().getFullYear()}. All right reserved</Typography>
            </Stack>

    </Stack>
  )
}
