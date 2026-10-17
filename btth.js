
// Danh mục dịch vụ minibar và đồ dùng khách sạn
const serviceCatalog = [
  { name: "Nước ngọt", price: 20000 },
  { name: "Bia", price: 30000 },
  { name: "Đồ ăn vặt", price: 25000 },
  { name: "Khăn tắm bẩn", price: 50000 }
];

// Thông tin hóa đơn khách hàng
const invoice = {
  bookingId: "BK-2024-8891",
  guestName: "Trần Minh Quang",
  roomPrice: 1500000,

  services: [
    { name: "Nước ngọt", quantity: 2, price: 20000 },
    { name: "Bia", quantity: 2, price: 30000 },
    { name: "Khăn tắm bẩn", quantity: 1, price: 50000 }
  ]
};

const VAT_RATE = 0.1;

let serviceTotal = 0;
let hasError = false;

console.log("========== GRAND HOTEL ==========");
console.log("HÓA ĐƠN THANH TOÁN CHECK-OUT");
console.log("Mã đặt phòng:", invoice.bookingId);
console.log("Khách hàng:", invoice.guestName);
console.log("---------------------------------");
console.log("CHI TIẾT DỊCH VỤ PHÁT SINH");
console.log("---------------------------------");

console.log(
  "Tên dịch vụ".padEnd(20) +
  "SL".padStart(5) +
  "Đơn giá".padStart(15) +
  "Thành tiền".padStart(18)
);

console.log("-".repeat(58));

// Duyệt danh sách dịch vụ khách sử dụng
for (const service of invoice.services) {
  let isAvailable = false;

  // Kiểm tra dịch vụ có trong danh mục hay không
  for (const item of serviceCatalog) {
    if (item.name === service.name) {
      isAvailable = true;
      break;
    }
  }

  // Kiểm tra dịch vụ ngoài danh mục
  if (!isAvailable) {
    console.log("Lỗi: Dịch vụ không tồn tại - " + service.name);
    hasError = true;
    continue;
  }

  // Kiểm tra số lượng
  if (
    !Number.isInteger(service.quantity) ||
    service.quantity < 0
  ) {
    console.log("Lỗi: Số lượng không hợp lệ - " + service.name);
    hasError = true;
    continue;
  }

  // Bỏ qua dịch vụ có số lượng bằng 0
  if (service.quantity === 0) {
    continue;
  }

  // Lấy đơn giá chính thức từ danh mục
  for (const item of serviceCatalog) {
    if (item.name === service.name) {
      service.price = item.price;
      break;
    }
  }

  // Tính tiền từng dịch vụ
  const itemTotal = service.quantity * service.price;
  serviceTotal += itemTotal;

  console.log(
    service.name.padEnd(20) +
    String(service.quantity).padStart(5) +
    service.price.toLocaleString("vi-VN").padStart(15) +
    itemTotal.toLocaleString("vi-VN").padStart(18)
  );
}

console.log("-".repeat(58));

// Tính toán hóa đơn
const roomPrice = invoice.roomPrice;
const subtotal = roomPrice + serviceTotal;
const vat = subtotal * VAT_RATE;
const totalAmount = subtotal + vat;

// In bảng tổng kết
console.log("Tiền phòng:".padEnd(35) +
  roomPrice.toLocaleString("vi-VN") + " đ");

console.log("Tổng tiền dịch vụ:".padEnd(35) +
  serviceTotal.toLocaleString("vi-VN") + " đ");

console.log("Tiền trước VAT:".padEnd(35) +
  subtotal.toLocaleString("vi-VN") + " đ");

console.log("VAT (10%):".padEnd(35) +
  vat.toLocaleString("vi-VN") + " đ");

console.log("TỔNG THANH TOÁN:".padEnd(35) +
  totalAmount.toLocaleString("vi-VN") + " đ");

if (hasError) {
  console.log("---------------------------------");
  console.log("CẢNH BÁO: Có dịch vụ không hợp lệ.");
  console.log("Vui lòng kiểm tra lại trước khi xác nhận hóa đơn.");
}

console.log("=================================");

