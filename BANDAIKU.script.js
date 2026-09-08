document.addEventListener("DOMContentLoaded", () => {
    // === 1. QUẢN LÝ CÔNG TẮC TOGGLE (BẬT / TẮT) ===
    const toggleInput = document.querySelector(".switch input");
    const toggleLabel = document.querySelector(".toggle-label");

    // Lấy trạng thái toggle đã lưu từ trước (nếu có)
    const savedToggle = localStorage.getItem("app_toggle_status");
    if (savedToggle === "true") {
        toggleInput.checked = true;
        toggleLabel.textContent = "Bật";
    } else {
        toggleInput.checked = false;
        toggleLabel.textContent = "Tắt";
    }

    // Sự kiện khi thay đổi công tắc
    toggleInput.addEventListener("change", (e) => {
        const isChecked = e.target.checked;
        toggleLabel.textContent = isChecked ? "Bật" : "Tắt";
        localStorage.setItem("app_toggle_status", isChecked);
    });

    // === 2. LƯU VÀ KHÔI PHỤC DỮ LIỆU INPUTS ===
    const formInputs = document.querySelectorAll(".container input, .container select");

    // Hàm load dữ liệu đã lưu từ localStorage lên giao diện
    function loadSavedData() {
        formInputs.forEach((input, index) => {
            const savedValue = localStorage.getItem(`input_val_${index}`);
            if (savedValue !== null && savedValue !== "") {
                input.value = savedValue;
            } else {
                // Trở về mặc định nếu chưa nhập
                if (input.tagName.toLowerCase() === "input") {
                    input.value = ""; // Giữ nguyên placeholder
                } else if (input.tagName.toLowerCase() === "select") {
                    input.selectedIndex = 0;
                }
            }
        });
    }

    // Load dữ liệu khi vừa mở trang
    loadSavedData();

    // === 3. NÚT "LƯU TẤT CẢ" ===
    const btnSubmit = document.querySelector(".btn-submit");
    btnSubmit.addEventListener("click", () => {
        formInputs.forEach((input, index) => {
            localStorage.setItem(`input_val_${index}`, input.value);
        });
        alert("Đã lưu tất cả thay đổi vào bộ nhớ trình duyệt!");
    });

    // === 4. NÚT "RESET INFO THẬT" ===
    const btnReset = document.querySelector(".btn-reset");
    btnReset.addEventListener("click", () => {
        if (confirm("Bạn có chắc chắn muốn xóa toàn bộ thông tin đã nhập và khôi phục lại ban đầu?")) {
            // Xóa dữ liệu input trong localStorage
            formInputs.forEach((input, index) => {
                localStorage.removeItem(`input_val_${index}`);
            });
            // Load lại giao diện
            loadSavedData();
            alert("Đã reset dữ liệu về mặc định!");
        }
    });

    // === 5. NÚT ĐÓNG BẠN MONG MUỐN (DẤU X TRÊN THANH VÀNG) ===
    const closeBtn = document.querySelector(".close-btn");
    const topBar = document.querySelector(".top-bar");
    closeBtn.addEventListener("click", () => {
        topBar.style.display = "none";
    });
});