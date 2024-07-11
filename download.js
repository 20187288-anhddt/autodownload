const axios = require("axios");
const fs = require("fs");
const path = require("path");
const https = require("https");

// URL của tệp cần tải xuống
const fileUrl = "https://autodownload.onlinewebshop.net/videodance.mp4";

// Đường dẫn lưu tệp tải xuống
const outputPath = path.resolve(
  "/Users/tienanh/WebBookingCare",
  "videodance.mp4"
);

// Đảm bảo thư mục đích tồn tại
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

// Tạo một agent để bỏ qua kiểm tra chứng chỉ SSL
const agent = new https.Agent({
  rejectUnauthorized: false,
});

// Tải tệp xuống
axios({
  method: "GET",
  url: fileUrl,
  responseType: "stream",
  httpsAgent: agent,
})
  .then((response) => {
    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      console.log("Tệp đã được tải xuống thành công:", outputPath);
    });

    writer.on("error", (err) => {
      console.error("Lỗi khi tải xuống tệp:", err);
    });
  })
  .catch((err) => {
    console.error("Lỗi khi gửi yêu cầu:", err);
  });
