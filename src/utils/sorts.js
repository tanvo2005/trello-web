// sort columnr cards
/**
 
 * @param {*} originalArray
 * @param {*} orderArray
 * @param {*} key = Key to order
 * @return new Ordered Array
 *
 * Xác định các phần tử trong array gốc ban đầu (originalArray) 
 * xem nó nằm ở đâu trong array thứ 2 (orderArray)
 * (là array mà mình dùng để sắp xếp) bằng cách tìm index (indexOf) 
 * rồi sẽ sắp xếp theo index đó bằng hàm sort của Javascript.
 * 
 * originalArray: mảng ban đầu
 * orderArray: mảng dùng để sắp xếp
 * key là khoá
 * nếu 1 trong 3 tham số đầu vào không tồn tại thì trả về mảng rống
 * clonedArray: tạo 1 bảng sao mảng ban đầu bằng toán tử spread
 * orderedArray: sắp xếp mảng đã sao chép bằng hàm sort, trong đó so sánh
 * vị trí của phần tử a và b trong orderArray bằng cách sử dụng indexOf với key tương ứng
 * 
 * nếu a-b<0 thì a sẽ được xếp trước b
 * nếu a-b>0 thì b sẽ được xếp trước a
 * nếu a-b=0 thì thứ tự của a và b không thay đổi
 */

export const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key) return []

  const clonedArray = [...originalArray]
  const orderedArray = clonedArray.sort((a, b) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
  })

  return orderedArray
}