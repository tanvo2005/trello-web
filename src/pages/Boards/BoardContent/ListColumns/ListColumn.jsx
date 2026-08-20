import React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'

function ListColumn({ columns }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  /**
   * toggleOpenNewColumnForm là 1 hàm để toggle trạng thái của openNewColumnForm
   * Nếu openNewColumnForm là true thì khi gọi hàm này sẽ chuyển sang false và ngược lại
   * Khi openNewColumnForm là true thì sẽ hiển thị form tạo column mới còn nếu là false thì sẽ ẩn form đi
   */
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)


  // xử lí việc lưu thông tin trong input của form tạo column mới
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const addNewColumn = () => {
    if (!newColumnTitle) {
      // console.error('please enter column title')
      return
    }
    // console.log('add new column: ', newColumnTitle)
    // goi api để xử lí ở đây

    // đóng lai trạng thái thêm column mới và clear input đi
    toggleOpenNewColumnForm()
    setNewColumnTitle('')

  }

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

        {!openNewColumnForm
          ? <Box onClick={toggleOpenNewColumnForm} sx={{
            minWidth: '250px',
            maxWidth: '250px',
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
          : <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            backgroundColor: '#ffffff3d',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              type='text'
              label='Enter column title'
              size='small'
              variant='outlined'
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}

              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' }, // css cho phần text nhập vào của TextField có màu trắng
                '& label.Mui-focused': { color: 'white' }, // khi focus vào TextField thì label vẫn có màu trắng, không bị đổi màu theo mặc định của Material UI
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white', },// màu viền mặc định của TextField
                  '&:hover fieldset': { borderColor: 'white', },
                  '&.Mui-focused fieldset': { borderColor: 'white', },

                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                onClick={addNewColumn}
                variant="contained" color="success" size='small'
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.success.main },
                }}
              >Add Column</Button>
              <CloseIcon
                fontSize='small'
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { color: (theme) => theme.palette.warning.light }
                }}
                onClick={toggleOpenNewColumnForm}
              />
            </Box>
          </Box>
        }


      </Box>
    </SortableContext>
  )
}

export default ListColumn