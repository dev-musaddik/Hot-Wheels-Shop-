import { Avatar, Paper, Stack, Typography, useTheme, useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../user/UserSlice';

export const AdminProfile = () => {
    const userInfo = useSelector(selectUserInfo);
    const theme = useTheme();
    const is900 = useMediaQuery(theme.breakpoints.down(900));
    const is480 = useMediaQuery(theme.breakpoints.down(480));

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }, []);

    return (
        <Stack height={'calc(100vh - 4rem)'} justifyContent={'flex-start'} alignItems={'center'}>
            <Stack component={is480 ? '' : Paper} elevation={1} width={is900 ? '100%' : "50rem"} p={2} mt={is480 ? 0 : 5} rowGap={2}>
                <Stack bgcolor={theme.palette.primary.light} color={theme.palette.primary.main} p={2} rowGap={1} borderRadius={'.6rem'} justifyContent={'center'} alignItems={'center'}>
                    <Avatar src='none' alt={userInfo?.name} sx={{ width: 70, height: 70 }}></Avatar>
                    <Typography variant="h5">{userInfo?.name}</Typography>
                    <Typography>{userInfo?.email}</Typography>
                </Stack>
                <Stack mt={2}>
                    <Typography variant='h6' fontWeight={400}>Role: Admin</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};
