# Chrysoberyl

ธีม WordPress สไตล์นิตยสารข่าว/บล็อก สำหรับเว็บเทคโนโลยีและนวัตกรรม — ออกแบบให้อ่านง่าย รองรับหลายอุปกรณ์ และเน้น SEO

**ดูตัวอย่าง:** [https://chrysoberyl.me](https://chrysoberyl.me)

---

## เกี่ยวกับโปรเจกต์

- **ทีมผู้พัฒนา:** [Tonkla IT](https://tonkla.co)
- **ที่มา:** ธีมนี้ **Fork** มาจาก **Trend Today** ซึ่งใช้งานจริงที่ [Gawao](https://gawao.com)
- **ชื่อธีม:** Chrysoberyl — ตั้งตามชื่อแร่คริสโซเบริล (Chrysoberyl) สื่อถึงความทันสมัยและความแข็งแกร่ง

---

## โครงสร้าง Repository

```
chrysoberyl/
├── mockup/                    # ต้นแบบ UI (HTML + Tailwind)
│   ├── index.html             # หน้าแรก
│   ├── category.html          # หน้าหมวดหมู่
│   ├── components/           # Header, Footer
│   ├── images/
│   └── js/loader.js           # โหลด component + ฟังก์ชัน UI
└── wp-content/themes/chrysoberyl/   # WordPress Theme
```

---

## ฟังก์ชันจาก Mockup (อ้างอิงการออกแบบ)

Mockup ในโฟลเดอร์ `mockup/` ใช้เป็นต้นแบบ UI/UX ของธีม โดยมีฟังก์ชันหลักดังนี้

### หน้าและเลย์เอาต์

| หน้า | ฟังก์ชัน |
|------|----------|
| **หน้าแรก** (`index.html`) | Hero section ข่าวเด่น, ปุ่มกรองหมวดหมู่ (Latest Stories, AI, Product News, Technology, Inside Google), กริดข่าวการ์ด, ปุ่ม "Load more stories" |
| **หน้าหมวดหมู่** (`category.html`) | Breadcrumb (หน้าแรก / ชื่อหมวด), หัวข้อหมวด + คำอธิบาย, กริดบทความ, Pagination (เลขหน้า + ปุ่มก่อน/ถัดไป) |

### Component: Header (`components/header.html`)

- **Logo + ชื่อไซต์** — ลิงก์กลับหน้าแรก
- **เมนูหลัก (Desktop)** — Latest Stories, Product Updates, Company News, AI & Innovation
- **ปุ่มภาษา** — เปิด Modal เลือกภาษา (English, Thai, Chinese, Japanese)
- **ปุ่มค้นหา** — เปิด Search Overlay พร้อมช่องค้นหา + Popular Searches (AI Update, Gemini, Android 15)
- **เมนูมือถือ** — ปุ่มฮัมเบอร์เกอร์ เปิด Drawer เมนูด้านขวา

### Component: Footer (`components/footer.html`)

- **About** — ข้อความเกี่ยวกับ Chrysoberyl
- **More from us** — ลิงก์ Latest Stories, Product Updates, Company News, AI & Innovation
- **Support** — Help Center, Contact Us, Privacy Policy, Terms of Service
- **Subscribe** — ช่องอีเมล + ปุ่ม Sign up สำหรับ Newsletter
- **ไอคอนโซเชียล** — Facebook, Twitter/X, Instagram
- **Copyright** — ปี, ลิงก์ไซต์, GPLv3, Help / Privacy / Terms

### JavaScript (`js/loader.js`)

| ฟังก์ชัน | การทำงาน |
|----------|----------|
| `loadComponent(containerId, componentPath)` | โหลด HTML จาก `components/` แล้ว inject เข้า placeholder (`#header-container`, `#footer-container`) |
| `toggleLanguageModal()` | เปิด/ปิด Modal เลือกภาษา |
| `toggleSearchOverlay()` | เปิด/ปิด overlay ค้นหา และโฟกัสที่ input |
| `toggleMobileMenu()` | เปิด/ปิด Drawer เมนูมือถือ |
| `toggleCategoryDropdown()` | เปิด/ปิด dropdown หมวดหมู่ (มือถือ) |
| `selectCategory(event, categoryName)` | เลือกหมวดใน dropdown อัปเดตข้อความ + ไอคอนถูก + ปิด dropdown |
| **Back to Top** | แสดงปุ่มเมื่อ scroll ลง > 300px, คลิกแล้ว scroll กลับด้านบนแบบ smooth |

### การออกแบบ (จาก Mockup)

- **Tailwind CSS** — ใช้ CDN + config สี (google-blue, google-gray), font (Google Sans, Noto Sans Thai), border-radius (card, pill), shadow
- **Responsive** — หมวดหมู่: dropdown บนมือถือ, pills บน desktop; Header: เมนู drawer มือถือ, แถบเมนู desktop
- **SEO** — meta description, keywords, canonical, Open Graph, Twitter Card
- **Accessibility** — ปุ่ม Back to Top มี `aria-label`, Modal มี `role="dialog"` และ `aria-modal`

---

## WordPress Theme

ธีมจริงอยู่ที่ `wp-content/themes/chrysoberyl/` นำโครงและฟังก์ชันจาก mockup ไป implement เป็นธีม WordPress (template, widgets, customizer, CPT ฯลฯ)

- รายละเอียดการติดตั้งและฟีเจอร์ของธีม: [wp-content/themes/chrysoberyl/README.md](wp-content/themes/chrysoberyl/README.md)

---

## ข้อกำหนด (Theme)

- WordPress 6.0+
- PHP 7.4+
- MySQL 5.6+

---

## License

GPLv3 — ดูรายละเอียดในธีมและไฟล์ license ที่เกี่ยวข้อง
