import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'

export const Separator: React.FC<{
  bgcolorUp: string
  bgcolorDown: string
  skewDirection?: 'up' | 'down'
  sx?: SxProps<Theme>
}> = ({ bgcolorUp, bgcolorDown, skewDirection = 'up', sx }) => {
  return (
    <Box sx={{ bgcolor: skewDirection === 'up' ? bgcolorDown : bgcolorUp, overflow: 'hidden' }}>
      <Box
        sx={{
          width: '100%',
          height: 350,
          transformOrigin: 'left',
          bgcolor: skewDirection === 'up' ? bgcolorUp : bgcolorDown,
          transform: skewDirection === 'up' ? 'skewY(-4deg)' : 'skewY(4deg)',
          ...sx,
        }}
      />
    </Box>
  )
}
