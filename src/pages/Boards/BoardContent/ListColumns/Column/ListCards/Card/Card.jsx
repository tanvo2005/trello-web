import React from 'react'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function Card({ card }) {
  // if (temporaryHeightMedia) {
  //   return (
  //     <MuiCard sx={{
  //       cursor: 'pointer',
  //       boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
  //       overflow: 'unset',
  //     }}>
  //       <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
  //         <Typography >card 01</Typography>
  //       </CardContent>

  //     </MuiCard>
  //   )
  // }

  const shouldShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length // kiểm tra 1 trong 3 thằng tồn tại thì là true
  }
  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset', // vì CardContent có overflow mặc định là hidden nên khi CardMedia 
      // có chiều cao lớn hơn chiều cao của CardContent sẽ bị ẩn đi, nên cần set overflow của Card
      //  thành unset để hiển thị đầy đủ nội dung của CardMedia
    }}>
      {card?.cover &&
        <CardMedia
          sx={{ height: 140 }}
          image={card?.cover}
          title=""
        />
      }
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography >{card?.title}</Typography>
      </CardContent>

      {shouldShowCardActions() &&
        <CardActions sx={{ p: '0px 4px 8px 4px' }}>
          {/* !!card?.memberIds?.length kiểm tra xem có dữ liệu hay không và trả về giá trị true hoạc false */}
          {/* <Button size="small" startIcon={<GroupIcon />}>20</Button> */}
          {!!card?.memberIds?.length && <Button size="small" startIcon={<GroupIcon />}>{card?.memberIds?.length}</Button>}

          {/* <Button size="small" startIcon={<CommentIcon />}>15</Button> */}
          {!!card?.comments?.length && <Button size="small" startIcon={<CommentIcon />}>{card?.comments?.length}</Button>}

          {/* <Button size="small" startIcon={<AttachmentIcon />}>10</Button> */}
          {!!card?.attachments?.length && <Button size="small" startIcon={<AttachmentIcon />}>{card?.attachments?.length}</Button>}

        </CardActions>
      }
    </MuiCard>
  )
}

export default Card