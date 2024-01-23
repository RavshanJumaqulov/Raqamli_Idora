import { CloseIcon, PlayVideoIcon } from '@components/icons/icons'
import { Box, Typography, createSvgIcon } from '@mui/material'

const FileIcon = createSvgIcon(
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path
      d="M33.5999 6.99023H4.3999C3.29533 6.99023 2.3999 7.88566 2.3999 8.99023V22.5902C2.3999 23.6948 3.29533 24.5902 4.3999 24.5902H33.5999C34.7045 24.5902 35.5999 23.6948 35.5999 22.5902V8.99023C35.5999 7.88566 34.7045 6.99023 33.5999 6.99023Z"
      fill="#F9B552"
    />
    <path
      d="M35.6 10.1902H4.4C1.96995 10.1902 0 12.1602 0 14.5902V32.5902C0 35.0203 1.96995 36.9902 4.4 36.9902H35.6C38.0301 36.9902 40 35.0203 40 32.5902V14.5902C40 12.1602 38.0301 10.1902 35.6 10.1902Z"
      fill="#FFCF5C"
    />
    <path
      d="M15.6 2.99023H4.4C1.96995 2.99023 0 4.96018 0 7.39023V13.7902C0 16.2203 1.96995 18.1902 4.4 18.1902H15.6C18.0301 18.1902 20 16.2203 20 13.7902V7.39023C20 4.96018 18.0301 2.99023 15.6 2.99023Z"
      fill="#FFCF5C"
    />
  </svg>,
  'FileIcon'
)

export default function ImgItem({
  url,
  type,
  event,
  xmark = true,
}: {
  url?: string
  type: 'img' | 'video' | 'file'
  event?: (url: string) => void
  xmark?: boolean
}) {
  return (
    <Box
      sx={{
        width: 100,
        height: 100,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        objectFit: 'cover',
      }}
    >
      <Box
        component={type == 'video' ? 'video' : 'div'}
        src={url}
        sx={{ width: '100%', height: '100%', objectFit: 'cover', display: type == 'file' && 'none', }}
      />
      {type == 'video' && (
        <Box
          sx={{
            display: 'flex',
            maxWidth: 44,
            maxHeight: 44,
            padding: 2,
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,
            borderRadius: 50,
            background: 'rgba(0, 0, 0, 0.50)',
            position: 'absolute',
            zIndex: 1000,
          }}
        >
          <PlayVideoIcon sx={{ color: '#fff' }} />
        </Box>
      )}
      {xmark ? (
        <Box
          onClick={() => event(url)}
          sx={{
            borderRadius: '50%',
            width: 22,
            height: 22,
            p: 0.5,
            position: 'absolute',
            top: 4,
            right: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.48)',
            zIndex: 100,
          }}
        >
          <CloseIcon sx={{ color: '#fff' }} />
        </Box>
      ) : null}

      {type == 'file' ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FileIcon sx={{ fontSize: 44 }} />
          <Typography
            variant="detailLabel"
            sx={{
              fontSize: 12,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {url.split('/')[url.split('/').length - 1]}
          </Typography>
        </Box>
      ) : (
        <Box
          component={type}
          src={url}
          sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      )}
    </Box>
  )
}
