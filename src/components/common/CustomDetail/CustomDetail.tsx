import { Box } from '@mui/material'
import CustomDetailItem from './CustomDetailItem'
import { Masonry } from '@mui/lab'
import { ImamInstructionDetailType } from '@src/types/detailHeaderTypes'



export default function CustomDetail({
    rows = 1,
    header,
    data
}: {
    rows?: number,
    header: ImamInstructionDetailType[],
    data: any
}) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            px: 2.5,
            py: 2,
            alignItems: 'flex-start',
            alignSelf: 'stretch',
            borderRadius: 3,
            border: '1px solid #CDD2D7',
            height: '100%'
        }}>
            <Box sx={{ display: 'block', width: '100%' }}>
                <Masonry columns={rows} spacing={3}>
                    {
                        header.map((el: ImamInstructionDetailType) => <CustomDetailItem el={el} data={data} key={el.headerName} />)
                    }
                </Masonry>
            </Box>
        </Box>
    )
}
