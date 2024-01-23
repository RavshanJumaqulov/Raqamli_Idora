import { Box } from '@mui/material'
import React from 'react'
import { Swiper } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
export default function CustomHandleSlider({ children }: { children: React.ReactNode }) {
    return (
        <Box
            sx={{
                width: "100%",
                position: "relative",
                overflow: "hidden",
                "& .swiper": {
                    width: "100%",
                    height: "100%",
                },

                "& .swiper-slide": {
                    textAlign: "center",
                    fontSize: 18,
                    display: "inline-block",
                    width: "auto",
                    mr: 2,
                    py: 1,
                    borderRadius: 4,
                    transition: "0.3s all",
                    cursor: 'default',
                },
                "& .swiper-pagination": {
                    display: "none",
                },
            }}
        >
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper"
            >
                {children}
            </Swiper>
        </Box>
    )
}
