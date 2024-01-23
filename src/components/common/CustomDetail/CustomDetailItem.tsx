import { SkripkaIcon } from '@components/icons/icons'
import { Box, Stack, Typography } from '@mui/material'
import { ImamInstructionDetailType } from '@src/types/detailHeaderTypes'

export default function CustomDetailItem({
  el,
  data,
}: {
  el: ImamInstructionDetailType
  data: any
}) {
  return (
    <Stack direction={'column'} gap={'4px'}>
      <Typography
        variant={el.type == 'izoh' ? 'subtitle2' : 'detailLabel'}
        sx={{ fontSize: 16, lineHeight: '26px' }}
      >
        {el.headerName}
      </Typography>
      {!el.type ? (
        <Typography
          sx={{
            color: 'sidebar.active',
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '22px',
          }}
        >
          {el?.renderCell ? el.renderCell(data) : ''}
        </Typography>
      ) : el.type == 'link' ? (
        <Box>
          <Stack
            component={el?.renderCell(data) ? 'a' : 'div'}
            href={el?.renderCell(data) && el.renderCell(data)}
            target="_blank"
            download={el?.renderCell(data) && true}
            direction={'row'}
            sx={{
              height: 30,
              padding: '5px',
              alignItems: 'center',
              gap: '5px',
              borderRadius: 1,
              background: '#EBF8F3',
              cursor: 'default',
              textDecoration: 'none',
            }}
          >
            <SkripkaIcon sx={{ color: 'sidebar.active' }} />
            <Typography
              sx={{
                color: '#00A76F',
                fontFamily: "'Public Sans', sans-serif",
                fontSize: 16,
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '22px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {el?.renderCell(data)
                ? el.renderCell(data).split('/')[el.renderCell(data).split('/').length - 1]
                : 'Fayl mavjud emas!'}
            </Typography>
          </Stack>
        </Box>
      ) : el.type == 'izoh' ? (
        <Box>
          <Typography
            sx={{
              color: el?.renderCell(data).length ? 'text.secondary' : 'error.main',
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 14,
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '26px',
              textIndent: '20px',
            }}
          >
            {el?.renderCell(data).length ? el.renderCell(data) : 'Izoh mavjud emas!'}
          </Typography>
        </Box>
      ) : (
        ''
      )}
    </Stack>
  )
}
