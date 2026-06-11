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
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'


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

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: card._id, data: { ...card } })
  // useSortable cần có id để xác định phần tử nào đang đước kéo thả
  // data: {...card}: bổ sung thêm data dữ liệu sau khi kéo thả

  const dndkitCardStyles = {
    // touchAction: 'none', // Dành cho sensor default dạng PointerSensor 
    // Nếu sử dụng CSS.Transform như docs sẽ lỗi kiểu stretch( Kéo dài)
    // https://github.com/clauderec/dnd-kit/issues/117
    // transform: CSS.Transform.toString(transform), sữa lỗi không có animation khi kéo thả column bằng cách chuyển đổi giá trị transform từ  sang Translate
    transform: CSS.Translate.toString(transform),

    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined,

  }

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndkitCardStyles} {...attributes} {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset', // vì CardContent có overflow mặc định là hidden nên khi CardMedia 
        // có chiều cao lớn hơn chiều cao của CardContent sẽ bị ẩn đi, nên cần set overflow của Card
        //  thành unset để hiển thị đầy đủ nội dung của CardMedia

        display: card?.FE_PlaceholderCard ? 'none' : 'block' // Ẩn Card đặc biệt Placeholder Card khi Column rỗng, vì nó chỉ phục vụ mục đích fix bug logic của thư viện Dnd-kit, không liên quan gì đến giao diện UI người dùng
      }}
    >
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