import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import Divider from '@mui/material/Divider'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'


function Column({ column }) {
  // const COLUMN_HEADER_HEIGHT = '50px'
  // const COLUMN_FOOTER_HEIGHT = '56px'

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    // event.currentTarget sẽ trả về phẩn tử Dom của Button đang nhấn dùng để xác định vị trí cảu menu
  }
  const handleClose = (event) => {
    setAnchorEl(null);
  }

  // sắp xếp card theo thứ tự của mảng cardOrderIds
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
  return (
    <>
      <Box sx={{
        minWidth: '300px',
        maxWidth: '300px',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
        marginLeft: '16px',
        borderRadius: '6px',
        height: 'fit-content', // chiều cao sẽ tự động điều chỉnh theo nội dung bên trong, nếu nội dung nhiều thì chiều cao sẽ tăng lên, nếu nội dung ít thì chiều cao sẽ giảm xuống
        maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`, // chiều cao tối đa sẽ bằng chiều cao của board content trừ đi khoảng cách giữa các column, nếu nội dung nhiều hơn chiều cao tối đa thì sẽ xuất hiện thanh cuộn
      }}>
        {/* header column */}
        <Box sx={{
          height: (theme) => theme.trello.columnHeaderHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title='More Options'>
              <ExpandMoreIcon
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                  color: 'text.primary',
                  cusor: 'pointer',
                }}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}   // anchorEl vị trí cảu menu
              open={open}  // open là true hoặc false để xác định menu đang mở hay đóng
              onClose={handleClose}
              MenuListProps={{    // MenuListProps là thuộc tính của Menu để truyền các thuộc tính cho MenuList bên trong Menu
                'aria-labelledby': 'basic-column-dropdown',
                // aria-labelledby là thuộc tính để xác định menu này được mở ra từ button nào, giá trị của nó sẽ là id của button đó
              }}
            >
              <MenuItem>
                <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>

              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Web Clipboard</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>


        {/* <ListCards cards={column?.cards} /> */}
        {/* truyền props vào để sắp xếp theo thứ tự của cardOrderIds */}
        <ListCards cards={orderedCards} />

        {/* footer column */}
        <Box sx={{
          height: (theme) => theme.trello.columnFooterHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Button startIcon={<AddCardIcon />}>Add new card</Button>
          <Tooltip title='Drag to move'>
            <DragHandleIcon sx={{ cursor: 'pointer' }} />
          </Tooltip>
        </Box>

      </Box>

      {/* <Box sx={{
        minWidth: '300px',
        maxWidth: '300px',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
        marginLeft: '16px',
        borderRadius: '6px',
        height: 'fit-content', // chiều cao sẽ tự động điều chỉnh theo nội dung bên trong, nếu nội dung nhiều thì chiều cao sẽ tăng lên, nếu nội dung ít thì chiều cao sẽ giảm xuống
        maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`, // chiều cao tối đa sẽ bằng chiều cao của board content trừ đi khoảng cách giữa các column, nếu nội dung nhiều hơn chiều cao tối đa thì sẽ xuất hiện thanh cuộn
      }}>
        <Box sx={{
          height: COLUMN_HEADER_HEIGHT,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Column Title
          </Typography>
          <Box>
            <Tooltip title='More Options'>
              <ExpandMoreIcon
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                  color: 'text.primary',
                  cusor: 'pointer',
                }}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}   // anchorEl vị trí cảu menu
              open={open}  // open là true hoặc false để xác định menu đang mở hay đóng
              onClose={handleClose}
              MenuListProps={{    // MenuListProps là thuộc tính của Menu để truyền các thuộc tính cho MenuList bên trong Menu
                'aria-labelledby': 'basic-column-dropdown',
                // aria-labelledby là thuộc tính để xác định menu này được mở ra từ button nào, giá trị của nó sẽ là id của button đó
              }}
            >
              <MenuItem>
                <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>

              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Web Clipboard</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        
        <Box sx={{
          p: '0 5px',
          m: '0 5px',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          overflowX: 'hidden', // ẩn thanh cuộng ngang
          overflowY: 'auto', // hiện thanh cuộn dọc khi nội dung vượt quá chiều cao của column
          maxHeight: (theme) => `calc(
                    ${theme.trello.boardContentHeight} - 
                    ${theme.spacing(5)} -
                    ${COLUMN_HEADER_HEIGHT} -
                    ${COLUMN_FOOTER_HEIGHT}
                  )`, // chiều cao tối đa trừ đi chiều cao header và footer để ra chiều cao content

          // chỉnh sữa thanh scrossbar của content column
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da', },
          '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf', },
        }}>
          <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
            overflow: 'unset', // vì CardContent có overflow mặc định là hidden nên khi CardMedia 
            // có chiều cao lớn hơn chiều cao của CardContent sẽ bị ẩn đi, nên cần set overflow của Card
            //  thành unset để hiển thị đầy đủ nội dung của CardMedia
          }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
              <Typography >vo xuan tan</Typography>
            </CardContent>
            <CardActions sx={{ p: '0px 4px 8px 4px' }}>
              <Button size="small" startIcon={<GroupIcon />}>20</Button>
              <Button size="small" startIcon={<CommentIcon />}>15</Button>
              <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
            </CardActions>
          </Card>

          <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
            overflow: 'unset',
          }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
              <Typography >card 01</Typography>
            </CardContent>

          </Card>
          
          <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
            overflow: 'unset',
          }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
              <Typography >card 01</Typography>
            </CardContent>

          </Card>

        </Box>

        <Box sx={{
          height: COLUMN_FOOTER_HEIGHT,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Button startIcon={<AddCardIcon />}>Add new card</Button>
          <Tooltip title='Drag to move'>
            <DragHandleIcon sx={{ cursor: 'pointer' }} />
          </Tooltip>
        </Box>

      </Box> */}
    </>
  )
}

export default Column