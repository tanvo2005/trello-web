import React from 'react'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumn({ columns }) {
  /* 
    * Thằng SortableContext yêu cầu items là một mảng dạng [ id-1', 'id-2'] chứ không phải [{id: 'id-1'},
    {id: 'id-2'}]
    * Nếu không đúng thì vẫn kéo thả được nhưng không có animation
    * https://github.com/clauderic/dnd-kit/issues/183#issuecomment-812569512
  */

  return (
    <SortableContext items={columns.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      {/* <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
       horizontalListSortingStrategy  là chiến lượt tối ưu sắp xếp theo chiều ngang 
       columns.map(c => c._id) lấy ra 1 mảng chứa taonf bộ id của columns
      */}
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
    </SortableContext>
  )
}

export default ListColumn