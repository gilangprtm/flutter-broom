# Flutter Broom

**Flutter Broom** adalah ekstensi Visual Studio Code yang dirancang untuk membantu pengembang Flutter dalam menghasilkan struktur proyek yang bersih dan terorganisir dengan cepat, menggunakan pendekatan Clean Architecture. Dengan Flutter Broom, Anda dapat menghemat waktu dalam menyiapkan file dan folder yang diperlukan untuk pengembangan aplikasi Flutter.

## Fitur

- **Generate Struktur Folder Otomatis:**
  Membuat folder seperti `data`, `presentation`, `services`, dan lainnya sesuai dengan arsitektur yang direkomendasikan.

- **Generate File untuk Fitur Baru:**
  Otomatis membuat file `Service`, `Provider`, dan `Page` untuk fitur baru yang Anda tentukan.

- **Update Routes dan Providers Secara Otomatis:**
  Menambahkan rute dan provider baru ke dalam konfigurasi yang sudah ada, tanpa perlu dilakukan secara manual.

- **Customizable Base Path:**
  Mendukung konfigurasi jalur dasar proyek Flutter Anda agar fleksibel.

## Cara Penggunaan

1. **Generate Struktur Proyek:**

   - Tekan `Ctrl+Shift+P` (atau `Cmd+Shift+P` di macOS).
   - Pilih perintah `Flutter Broom: Generate Project Structure`.

2. **Generate Fitur Baru:**

   - Tekan `Ctrl+Shift+P` (atau `Cmd+Shift+P` di macOS).
   - Pilih perintah `Flutter Broom: Generate New Feature`.
   - Masukkan nama fitur, lalu ekstensi akan membuat folder dan file terkait (Page, Provider, dan Service).

3. **Update Routes atau Providers:**
   - Ekstensi secara otomatis memperbarui file `app_routes.dart` dan `app_providers.dart` setiap kali Anda menambahkan fitur baru.

## Kebutuhan

- **Flutter SDK**: Pastikan Flutter sudah terinstal di komputer Anda.
- **Visual Studio Code**: Versi terbaru direkomendasikan.
- **Node.js**: Untuk menjalankan ekstensi ini, Node.js harus terinstal.

## Konfigurasi Ekstensi

Ekstensi ini mendukung konfigurasi berikut di `settings.json`:

- `flutterBroom.projectRoot`: Menentukan jalur root proyek Flutter Anda. Default: `lib`.
- `flutterBroom.usePascalCase`: Mengaktifkan/menonaktifkan penggunaan PascalCase untuk penamaan file. Default: `true`.

## Masalah yang Diketahui

- **Ekstensi tidak berjalan:**
  Jika perintah tidak bekerja, pastikan Anda telah menginstal semua prasyarat.
- **Nama file salah:**
  Pastikan Anda mengikuti konvensi penamaan sesuai konfigurasi.

## Catatan Rilis

### 1.0.0

- Rilis awal Flutter Broom.
- Fitur generate struktur folder, fitur baru, dan update rute serta provider.

## Panduan Pengembangan

Jika Anda ingin berkontribusi atau mempelajari lebih lanjut tentang pengembangan ekstensi ini, silakan baca dokumentasi berikut:

- [Visual Studio Code Extension API](https://code.visualstudio.com/api)
- [Clean Architecture for Flutter](https://resocoder.com/flutter-clean-architecture/)

**Selamat Berkarya dengan Flutter Broom!**
