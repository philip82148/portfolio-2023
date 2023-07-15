import { Box } from '@mui/material'

export const Separator: React.FC<{
  bgcolorAbove: string
  bgcolorBelow: string
  skewDirection?: 'up' | 'down'
}> = ({ bgcolorAbove, bgcolorBelow, skewDirection = 'up' }) => {
  return (
    <Box
      sx={[
        { bgcolor: bgcolorBelow, overflow: 'hidden' },
        skewDirection === 'down' && { bgcolor: bgcolorAbove },
      ]}
    >
      <Box
        sx={[
          {
            width: '100%',
            height: 200,
            bgcolor: bgcolorAbove,
            transform: 'skewY(-4deg)',
            transformOrigin: 'left',
          },
          skewDirection === 'down' && {
            bgcolor: bgcolorBelow,
            transform: 'skewY(4deg)',
          },
        ]}
      />
    </Box>
  )
}
