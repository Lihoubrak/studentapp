# Triển khai

## Cách mở ứng dụng
Ứng dụng của em được triển khai và thử nghiệm trên localhost. Dưới đây là hướng dẫn chi tiết về cách mở và chạy ứng dụng:
#### App di động
1. Cài đặt các thư viện cần thiết bằng cách chạy lệnh `npm install` trong thư mục dự án React Native.
2. Cấu hình Firebase Firestore trong dự án React Native bằng cách thêm cấu hình Firebase vào tệp cấu hình của dự án:
    ```javascript
    const firebaseConfig = {
      EXPO_PUBLIC_FIREBASE_API_KEY: "your_api_key",
      EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: "your_auth_domain",
      EXPO_PUBLIC_FIREBASE_PROJECT_ID: "your_project_id",
      EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: "your_storage_bucket",
      EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "your_messaging_sender_id",
      EXPO_PUBLIC_FIREBASE_APP_ID: "your_app_id",
      EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID: "your_measurement_id",
      EXPO_PUBLIC_STRIPE_KEY: "your_stripe_key"
    };
    ```
3. Chạy lệnh `npx expo start` để khởi động ứng dụng di động trên Expo.
4. Sử dụng ứng dụng Expo Go trên thiết bị di động để quét mã QR và mở ứng dụng.
5. **Lưu ý**: Để ứng dụng di động có thể truy cập API trên localhost, cần thay đổi địa chỉ localhost thành địa chỉ IP của mạng WiFi. Để tìm địa chỉ IP của máy tính, có thể sử dụng lệnh `ipconfig` (Windows) hoặc `ifconfig` (Mac/Linux) trong terminal. Sau đó, thay đổi địa chỉ API trong mã nguồn từ `http://localhost:3000` thành `http://<địa_chỉ_IP_của_bạn>:3000`.
