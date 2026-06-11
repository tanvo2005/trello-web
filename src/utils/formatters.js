export const capitalizeFirstLetter = (str) => {
  if (!str) return ''
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}

/**
 * Cách xử lý bug logic thư viện Dnd-kit khi Column là rỗng:
 * Phía FE sẽ tự tạo ra một cái card đặc biệt: Placeholder Card, không liên quan tới Back-end
 * Card đặc biệt này sẽ được ẩn ở giao diện UI người dùng.
 * Cấu trúc Id của cái card này để Unique rất đơn giản, không cần phải làm random phức tạp:
 * "columnId-placeholder-card" (mỗi column chỉ có thể có tối đa một cái Placeholder Card)
 * Quan trọng khi tạo: phải đầy đủ: (_id, boardId, columnId, FE_PlaceholderCard)
*/

export const generatePlaceholderCard = (column) => {
  return {
    _id: ` ${column._id}-placeholder-card) `, // id đặc biệt có chứa columnId để dễ dàng nhận biết và xử lý logic liên quan đến placeholder card
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true, // thêm thuộc tính để phân biệt card chỉ xử lí ở FE
  }
}