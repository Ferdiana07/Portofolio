# Caesar Ferdiana Suwandi — Portfolio

Portofolio Software / AI / Cloud: panggung fullscreen, warna mineral, tekstur kanvas, dan kontrol taktil.

## Menjalankan

Node.js 20.9 atau lebih baru:

```bash
npm ci
npm run dev
```

Buka http://localhost:3000. Untuk pengujian produksi:

```bash
npm run lint
npm run test:motion
npm run build
npm run start
```

## Navigasi yang baru

- Desktop: scroll menghabiskan isi section terlebih dahulu. Gerakan berikutnya di ujung isi baru memindahkan satu section. Momentum trackpad tidak melompati beberapa section.
- HP/tablet (lebar maksimal 1024px atau pointer utama coarse): scroll hanya untuk isi. Pindah section lewat panah kanan bawah atau menu.
- Transisi iris, curtain dan arch berjalan 680ms, tanpa runway scroll panjang atau delay spring. Link menu yang melompati beberapa section langsung membuka tujuan.
- Reduced motion: perpindahan instan dan dekorasi/ketikan diam. Tanpa JavaScript: semua isi tetap tersedia sebagai dokumen linear.
- Menu pendek/landscape punya batas tinggi dan scroll sendiri. Fokus keyboard berpindah ke section setelah menu ditutup.

## Konten dan visual

- Data CV, profil, lima projek, skill, pengalaman dan sertifikasi: `src/data/portfolio.ts`.
- Warna tiap bab: `src/data/journey.ts`.
- Pose transisi: `src/lib/scene-transition.ts`; regresinya: `scripts/check-scene-transitions.mjs`.
- Hero: `CanvasStudy.tsx`, monogram CFS berlapis tiga pita dengan perspektif CSS, tilt mouse terbatas, dan tombol “Susun ulang”. Tidak ada puzzle, Acak, atau maskot.
- Referensi asli dan aset eksperimen lama tetap disimpan; tidak dimuat oleh hero.
- Tekstur: SVG statis `public/images/canvas-weave.svg`, tanpa filter noise/runtime canvas.
- Tiap bab mempunyai motif gerak berbeda: pesawat kertas, burung, orbit, prisma, kompas, bintang, dan pesan. Hanya motif aktif yang berjalan; tombol Gerak, tab tersembunyi dan reduced motion menghentikannya.
- About me memakai bahasa personal serta loop Software / AI / Cloud: ketik, jeda, hapus, ulang. Teks lengkap tetap tersedia untuk pembaca layar.
- Intro sekitar 3,9 detik, selesai otomatis tanpa tombol lewati, sekali per sesi. Anchor langsung, catalogue dan reduced motion melewatinya.
- Preview projek memakai perspektif, tombol, keyboard dan swipe. Catalogue `/projects` dibuka di tab baru, dengan filter, detail, logo TechStack, status deployment sebenarnya, dan screenshot `object-fit:contain`.
- Sertifikasi: pengantar tetap diam, daftar memiliki scroll tersendiri.
- Stylesheet: komponen dasar di `globals.css`; panggung/katalogue di `immersive.css`; hero/Hello di `mascot-story.css` (nama legacy); material di `chapter-craft.css`; ruler/kontrol di `canvas-study.css`; navigasi baru, seal dan motif di `scene-details.css`.
- Sistem visual: `DESIGN.md` + `.impeccable/design.json`.

Tidak ada tambahan WebGL, video background, library scroll, atau dependency runtime baru.

## Musik dan email

Musik lokal dari `public/music/3 Minute Timer with Relaxing Lofi Music.mp 3`: off saat awal, tanpa source/request sebelum opt-in, volume 18%, loop dan pause ketika tab tersembunyi. Tombol “Nyalakan musik” tetap ada; teks “Lofi untuk menemani” dihapus.

FormSubmit mengirim ke ferdianacaesar@gmail.com setelah pemilik menyelesaikan aktivasi layanan. Tes memakai respons simulasi untuk sukses/gagal, tidak mengirim email sungguhan.

## Audit dan referensi

Audit terbaru: `.impeccable/audit-2026-10-21.md`. Rincian pengujian: `.impeccable/verification.md`.
Observasi referensi: `.impeccable/motion-research.md`; referensi menjadi panduan, bukan sumber kode/aset yang disalin.

Remotion, Framer External Agent, TasteSkill dan REA adalah alat pengembangan, bukan dependency website. Logo Devicon di `public/icons` mengikuti `LICENSE-devicon.txt`.
