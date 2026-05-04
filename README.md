# 💰 E-Wallet App

Aplikasi **E-Wallet sederhana** berbasis **React + TypeScript** yang memungkinkan pengguna melakukan transaksi keuangan seperti transfer, top-up saldo, serta melihat riwayat aktivitas.

---

## 🚀 Tech Stack

- ⚛️ React
- 🟦 TypeScript
- 🎨 CSS / Tailwind
- 🌐 React Router
- 🔔 React Toastify (notifikasi)
- 💾 LocalStorage (penyimpanan data sementara)

---

## ✨ Fitur Utama

### 1. 💸 Transfer

- Kirim saldo ke pengguna lain
- Input nomor rekening tujuan
- Tambahkan deskripsi transaksi
- Validasi saldo sebelum transfer

---

### 2. 💳 Top Up Saldo

- Tambah saldo ke akun
- Input nominal top-up
- Update saldo secara real-time

---

### 3. 👁️ Show / Hide Saldo

- Menampilkan saldo pengguna
- Fitur **hide saldo** untuk menjaga privasi
- Toggle untuk show/hide saldo

---

### 4. 📊 Aktivitas Transaksi

- Menampilkan **riwayat transaksi**
- List transfer masuk & keluar
- Informasi:
  - Nominal
  - Tanggal
  - Deskripsi

---

## 📂 Struktur Folder (Contoh)

```
src/
│── components/
    └── Layout/
    ├── bottomNavbar.tsx
    ├── navbar.tsx

    └── menuUtama.tsx
│── pages/
│   ├── Home.tsx
│   ├── aktivitasSection.tsx
│   ├── topupPages.tsx
│   ├── transferPages.tsx
│── context/
│   └── WalletContext.tsx
│── router/
    └── router.tsx
│── App.tsx
│── main.tsx
```

---

## ⚙️ Cara Menjalankan Project

1. Clone repository

```bash
git clone https://github.com/username/ewallet-app.git
```

2. Masuk ke folder project

```bash
cd ewallet-app
```

3. Install dependencies

```bash
npm install
```

4. Jalankan project

```bash
npm run dev
```

---

## 💡 Cara Kerja Singkat

- Saldo disimpan menggunakan **LocalStorage**
- Setiap transaksi:
  - Mengurangi atau menambah saldo
  - Disimpan ke dalam list aktivitas

- Data akan tetap ada selama browser tidak di-clear

---

## 🔒 Catatan

- Project ini masih bersifat **frontend simulation**
- Tidak menggunakan backend / database

---

## 📌 Future Improvement

- 🔐 Authentication (Login/Register)
- 🌍 Integrasi API / Backend
- 📱 Responsive UI
- 📈 Grafik pengeluaran
- 💵 Multi akun

---

## 👨‍💻 Author

Dibuat oleh: **[Gyandra Naufal]**

---

## ⭐ Penutup

Project ini dibuat untuk memenuhi tugas desain yang diberikan oleh dosen saya, dan sekaligus meningkatkan skill saya

---
