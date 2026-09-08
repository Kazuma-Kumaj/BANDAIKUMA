// 1. Lấy các phần tử HTML thông qua ID
const btnCount = document.getElementById('btn-count');
const btnTheme = document.getElementById('btn-theme');
const btnReset = document.getElementById('btn-reset'); // Nút Reset mới
const counterVal = document.getElementById('counter-val');
const body = document.body;

// =========================================================
// A. KHỞI TẠO DỮ LIỆU TỪ LOCALSTORAGE KHI TẢI TRANG (F5)
// =========================================================

// 1. Phôi phục Số đếm
// Nếu trong localStorage đã có dữ liệu 'savedCount', lấy ra dùng. Nếu chưa có, mặc định là 0.
let count = localStorage.getItem('savedCount') ? parseInt(localStorage.getItem('savedCount')) : 0;
counterVal.textContent = count; // Hiển thị số đếm cũ lên màn hình

// 2. Phôi phục Chế độ Tối / Sáng
const savedTheme = localStorage.getItem('savedTheme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    btnTheme.textContent = "Đổi chế độ Sáng";
} else {
    body.classList.remove('dark-mode');
    btnTheme.textContent = "Đổi chế độ Tối";
}


// =========================================================
// B. XỬ LÝ SỰ KIỆN VÀ LƯU DỮ LIỆU MỚI
// =========================================================

// 1. Xử lý khi bấm nút Đếm
btnCount.addEventListener('click', function() {
    count++; // Tăng số đếm
    counterVal.textContent = count; // Cập nhật giao diện
    
    // LƯU SỐ ĐẾM MỚI VÀO LOCALSTORAGE
    localStorage.setItem('savedCount', count);
});

// 2. Xử lý khi bấm nút Đổi chế độ Sáng / Tối
btnTheme.addEventListener('click', function() {
    body.classList.toggle('dark-mode');

    // Kiểm tra xem hiện tại có đang ở chế độ Tối không
    if (body.classList.contains('dark-mode')) {
        btnTheme.textContent = "Đổi chế độ Sáng";
        // LƯU TRẠNG THÁI TỐI VÀO LOCALSTORAGE
        localStorage.setItem('savedTheme', 'dark');
    } else {
        btnTheme.textContent = "Đổi chế độ Tối";
        // LƯU TRẠNG THÁI SÁNG VÀO LOCALSTORAGE
        localStorage.setItem('savedTheme', 'light');
    }
});
// 3. XỬ LÝ KHI BẤM NÚT RESET
btnReset.addEventListener('click', function() {
    // Hỏi xác nhận trước khi xóa (tùy chọn)
    const isConfirm = confirm("Bạn có chắc chắn muốn đặt lại số đếm và cài đặt không?");
    
    if (isConfirm) {
        // Đưa số đếm về 0
        count = 0;
        counterVal.textContent = count;

        // Trả giao diện về chế độ Sáng mặc định
        body.classList.remove('dark-mode');
        btnTheme.textContent = "Đổi chế độ Tối";

        // XÓA DỮ LIỆU TRONG LOCALSTORAGE
        // Cách 1: Xóa toàn bộ dữ liệu lưu trữ của trang web
        localStorage.clear();

        // Cách 2: Nếu chỉ muốn xóa từng khóa cụ thể, bạn dùng:
        // localStorage.removeItem('savedCount');
        // localStorage.removeItem('savedTheme');
    }
});