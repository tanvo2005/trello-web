import React from 'react'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

function ListColumn({ columns }) {

  return (
    <Box
      sx={{
        backgroundColor: 'inherit', //inherit là kế thừa màu nền của thằng cha
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }   // '&::-webkit-scrollbar-track css cho phần bộ ở ngoài của thanh cuộn
      }}
    > {/* box này có tác dụng để làm thanh scroll cho nó đẹp khi có nhiều column */}

      {columns?.map((column, index) => {
        return <Column key={index} column={column} />
      })}

      <Box sx={{
        minWidth: '200px',
        maxWidth: '200px',
        mx: 2,
        borderRadius: '6px',
        height: 'fit-content',
        backgroundColor: '#ffffff3d'
      }}>
        <Button
          startIcon={<AddIcon />}
          sx={{
            color: 'white',
            width: '100%',
            justifyContent: 'flex-start',
            pl: 2.5,
            py: 1,

          }}
        >
          Add new column
        </Button>
      </Box>

    </Box>
  )
}

export default ListColumn