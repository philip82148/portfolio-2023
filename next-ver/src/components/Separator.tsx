import { Box } from '@mui/material'

export const Separator: React.FC<{
  bgcolorAbove: string
  bgcolorBelow: string
  skewDirection?: 'up' | 'down'
}> = ({ bgcolorAbove, bgcolorBelow, skewDirection = 'up' }) => {
  return (
    <Box
      sx={[{ bgcolor: skewDirection === 'up' ? bgcolorBelow : bgcolorAbove, overflow: 'hidden' }]}
    >
      <Box
        sx={{
          width: '100%',
          height: 200,
          transformOrigin: 'left',
          bgcolor: skewDirection === 'up' ? bgcolorAbove : bgcolorBelow,
          transform: skewDirection === 'up' ? 'skewY(-4deg)' : 'skewY(4deg)',
        }}
      />
    </Box>
  )
}
