# แผนพัฒนา Theme Chrysoberyl ให้แสดงผลเหมือน Mockup

เอกสารนี้เป็นแผนพัฒนาแบบละเอียด สำหรับนำ Theme WordPress (Chrysoberyl) ให้แสดงผลและพฤติกรรมตรงกับ Mockup ที่สร้างไว้ครบทุกหน้า โดยทำและทดสอบทีละขั้นตอนเพื่อป้องกันความผิดพลาด

---

## 1. สรุปสถานะปัจจุบัน

### 1.1 Mockup (พร้อมใช้)

| ไฟล์ | คำอธิบาย |
|------|----------|
| `mockup/index.html` | หน้าแรก — Hero (ข่าวเด่น 1 รายการ) + Category filters (mobile dropdown / desktop pills) + News grid + Load more |
| `mockup/category.html` | หน้าหมวดหมู่ — Breadcrumb + Category hero + Article grid + Pagination |
| `mockup/single.html` | หน้าบทความเดี่ยว |
| `mockup/search.html` | หน้าค้นหา |
| `mockup/404.html` | หน้าไม่พบ |
| `mockup/about.html` | หน้าเกี่ยวกับเรา |
| `mockup/contact.html` | หน้าติดต่อ |
| `mockup/faq.html` | หน้า FAQ |
| `mockup/privacy.html` | หน้านโยบายความเป็นส่วนตัว |
| `mockup/terms.html` | หน้าเงื่อนไขการใช้งาน |
| `mockup/author.html` | หน้าผู้เขียน |
| `mockup/tag.html` | หน้าแท็ก |
| `mockup/sitemap.html` | หน้า Sitemap |
| `mockup/components/header.html` | Header — Logo, เมนู, ปุ่มภาษา, Search overlay, Mobile menu drawer |
| `mockup/components/footer.html` | Footer — About, More from us, Support, Newsletter, Social, Copyright, Language modal |
| `mockup/js/loader.js` | โหลด component + ฟังก์ชัน UI (search, language, mobile menu, category dropdown, back to top) |

**ดีไซน์ Mockup:** Tailwind CSS, สี google-blue / google-gray, Font Google Sans + Noto Sans Thai, border-radius card/pill, shadow card/card-hover, responsive (mobile-first)

### 1.2 Theme (มีอยู่แล้วบางส่วน)

- **Header:** `header.php` + `template-parts/navbar.php` — มี logo, เมนู, search (dropdown/modal), mobile menu
- **Footer:** `footer.php` — มี 4 คอลัมน์ (sidebar/menu/social), newsletter, copyright, back to top
- **หน้าแรก:** `home.php` — ใช้ `hero-section.php` (slider ข่าวเด่น), grid ข่าวล่าสุด, sidebar, load more/pagination
- **Hero:** `template-parts/hero-section.php` — **Slider หลาย slide** (ต่างจาก mockup ที่เป็น **Hero เดี่ยว 1 รายการ**)
- **Category filters:** `template-parts/category-filters.php` — ปุ่ม pills แนวนอน (ไม่มี mobile dropdown แบบ mockup)
- **News card:** `template-parts/news-card.php` — การ์ดข่าว
- **Archive:** `archive.php` — หมวด/แท็ก/ผู้เขียน
- **Single:** `single.php` — บทความเดี่ยว, breadcrumb, sidebar
- **Search:** `search.php` — ฟอร์มค้นหา + ผลลัพธ์
- **404:** `404.php`
- **Options:** ใช้ `get_option('chrysoberyl_...')` (WordPress Options API) — **ไม่มี Carbon Fields**
- **Tailwind:** `tailwind.config.js` — สี accent (#FF4500), font Prompt (ต่างจาก mockup ที่เป็น Google Sans + Noto Sans Thai, สี google-blue)

### 1.3 ช่องว่างหลัก (Gap)

| หัวข้อ | Mockup | Theme ปัจจุบัน |
|--------|--------|-----------------|
| Hero หน้าแรก | **เดี่ยว** — 1 ข่าวเด่น (ข้อความซ้าย + รูปขวา) | **Slider** หลาย slide |
| Category filters | Mobile: **dropdown** / Desktop: **pills** | Pills แนวนอนเท่านั้น |
| สี / ฟอนต์ | google-blue, google-gray, Google Sans, Noto Sans Thai | accent #FF4500, Prompt |
| Header/Footer โครงและสไตล์ | โครง 4 คอลัมน์ footer, สไตล์ minimal | โครงมีแล้ว แต่สไตล์ gradient / สีไม่ตรง mockup |
| หน้าต่างๆ | about, contact, faq, privacy, terms, author, tag, sitemap | ใช้ page.php ทั่วไป หรือยังไม่มี template เฉพาะ |
| Search overlay | Full overlay + Popular searches | มี search modal อยู่แล้ว — ต้องเช็กความเหมือน |
| Back to top | แสดงเมื่อ scroll > 300px, ปุ่มมุมล่างขวา | มีอยู่แล้ว — ต้องเช็กสไตล์/พฤติกรรม |

---

## 2. Plugin ที่แนะนำ

### 2.1 ไม่บังคับ (Theme ทำได้เอง)

- **Carbon Fields** — ไม่ใช้ใน theme ปัจจุบัน (ใช้ native `add_meta_box` และ `get_option`). ถ้าต้องการ UI คัสเตอร์ฟิลด์ที่สวยและยืดหยุ่น ค่อยเพิ่มภายหลัง; ไม่จำเป็นสำหรับการให้แสดงผลเหมือน mockup
- **Custom Post Type UI** — Theme ลบฟังก์ชัน CPT (`video_news`, `gallery`, `featured_story`) ออกแล้ว ใช้เฉพาะ post และ page

### 2.2 แนะนำตามหน้าที่มีใน Mockup

| Plugin | วัตถุประสงค์ | ทางเลือกใน Theme |
|--------|----------------|-------------------|
| **Contact Form 7** | หน้า Contact (`contact.html`) — ฟอร์มติดต่อ | ใช้ shortcode ใน Page; Theme แค่จัด layout ตรง mockup |
| **Newsletter (หรือ Mailchimp, etc.)** | Footer — ช่องสมัครรับข่าวสาร | Theme มีฟอร์ม newsletter อยู่แล้ว (AJAX/handler); ถ้าต้องการเก็บอีเมลจริง/ส่งเมล ใช้ plugin หรือ API |
| **WP Multilingual (WPML) / Polylang** | ปุ่มเลือกภาษาใน header (mockup มี Language modal) | ถ้าต้องหลายภาษา; ถ้า single language แค่ซ่อนหรือไม่แสดง modal |

สรุป: **สำหรับเป้าหมาย “แสดงผลเหมือน mockup” ไม่บังคับต้องติดตั้ง plugin เพิ่ม** — ใช้ Contact Form 7 เมื่อมีหน้า Contact จริง, Newsletter plugin ถ้าต้องการระบบส่งเมลจริง

---

## 3. การแบ่งส่วนการแสดงผล (Structure)

การแบ่งส่วนให้สอดคล้องกับ Mockup และโครง Theme ปัจจุบัน:

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (template-parts/navbar → ปรับจาก mockup header)     │
│  Logo | เมนูหลัก | ปุ่มภาษา | ปุ่มค้นหา | เมนูมือถือ        │
├─────────────────────────────────────────────────────────────┤
│  Search Overlay (template-parts/search-modal) — ซ้อนทับ    │
│  Language Modal — ซ้อนทับ (ถ้ามี)                           │
├─────────────────────────────────────────────────────────────┤
│  MAIN CONTENT (ขึ้นกับ template หน้า)                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ HERO (หน้าแรกเท่านั้น)                                 │  │
│  │ - Mockup: เดี่ยว 1 รายการ (ข้อความซ้าย + รูปขวา)     │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ CATEGORY FILTERS (หน้าแรก / archive ตาม mockup)       │  │
│  │ - Mobile: dropdown | Desktop: pills                   │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ BODY: เนื้อหาหลัก                                      │  │
│  │ - หน้าแรก: News grid + Load more                      │  │
│  │ - หมวดหมู่: Article grid + Pagination                 │  │
│  │ - Single: บทความ + sidebar (ถ้าเปิด)                  │  │
│  │ - Search: ผลค้นหา                                      │  │
│  │ - 404 / about / contact / ฯลฯ                         │  │
│  └───────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  FOOTER (footer.php → ปรับจาก mockup footer)                │
│  About | More from us | Support | Subscribe + Social        │
│  Copyright bar                                               │
├─────────────────────────────────────────────────────────────┤
│  Back to Top (ปุ่มมุมล่างขวา, แสดงเมื่อ scroll > 300px)      │
└─────────────────────────────────────────────────────────────┘
```

### 3.1 Mapping ไฟล์ Mockup → Theme

| ส่วน | Mockup | Theme (ไฟล์ที่แก้/ใช้) |
|------|--------|-------------------------|
| Header | `components/header.html` | `template-parts/navbar.php`, `header.php` |
| Search overlay | ใน header.html | `template-parts/search-modal.php` |
| Language modal | ใน footer.html (รวมใน component) | ส่วนใหม่หรือรวมใน footer — ฝั่ง PHP/JS |
| Hero หน้าแรก | `index.html` บล็อก Hero เดี่ยว | `template-parts/hero-section.php` (เปลี่ยนจาก slider เป็น hero เดี่ยว) หรือ template part ใหม่ |
| Category filters | `index.html` + `category.html` | `template-parts/category-filters.php` |
| News/Article grid | `index.html`, `category.html` | `template-parts/news-card.php`, `home.php`, `archive.php` |
| Breadcrumb | `category.html` | `template-parts/breadcrumb.php` |
| Pagination | `category.html` | `template-parts/pagination.php` |
| Footer | `components/footer.html` | `footer.php` |
| Back to top | `js/loader.js` | ปุ่มใน `footer.php` + JS ใน theme |
| หน้า Single | `single.html` | `single.php` + template-parts ที่เกี่ยวข้อง |
| หน้า Search | `search.html` | `search.php` |
| 404 / About / Contact / FAQ / Privacy / Terms | ไฟล์ .html ตามชื่อ | `404.php`, หน้า Page ปกติ หรือ template เฉพาะ (เช่น `page-about.php`) ตามความต้องการ |

---

## 4. แผนพัฒนาแบบ Phase (ทำและทดสอบทีละขั้น)

### Phase 0: เตรียมสภาพแวดล้อมและสไตล์ฐาน

**วัตถุประสงค์:** ให้ theme ใช้สีและฟอนต์ตรง mockup เพื่อให้ขั้นถัดไปเปรียบเทียบง่าย

| ลำดับ | ขั้นตอน | ไฟล์ที่แก้ | เกณฑ์ทดสอบ |
|-------|----------|------------|-------------|
| 0.1 | เพิ่ม/แทนที่สีและฟอนต์ใน Tailwind ให้ตรง mockup (google-blue, google-gray, Google Sans, Noto Sans Thai) | `tailwind.config.js` | Build CSS แล้วเปิดหน้าใดก็ได้ — ตรวจสีและฟอนต์จาก DevTools |
| 0.2 | เพิ่ม utility / component ที่ mockup ใช้ (เช่น rounded-card, rounded-pill, shadow-card, shadow-card-hover) | `tailwind.config.js` หรือ `assets/css/tailwind-src.css` | Class ใช้ได้ใน template |
| 0.3 | Enqueue Google Fonts (Google Sans, Noto Sans Thai) | `inc/enqueue-scripts.php` หรือที่โหลด font | หน้า theme โหลดฟอนต์ถูกต้อง |

**ทดสอบ Phase 0:** เปิดหน้าแรกและหน้าหมวดหมู่ — ตรวจว่าไม่มี error, สี/ฟอนต์ใกล้ mockup (ไม่ต้อง layout ตรงทุกจุดในขั้นนี้)

---

### Phase 1: Header & Navbar

**วัตถุประสงค์:** โครงและพฤติกรรม header ตรง mockup (logo, เมนู, ปุ่มภาษา, ค้นหา, เมนูมือถือ)

| ลำดับ | ขั้นตอน | ไฟล์ที่แก้ | เกณฑ์ทดสอบ |
|-------|----------|------------|-------------|
| 1.1 | ปรับ `navbar.php` — โครง HTML และ class ให้ตรง `mockup/components/header.html` (ความสูง, ขอบ, container) | `template-parts/navbar.php` | เปรียบเทียบกับ mockup หน้าเดียวกัน |
| 1.2 | Logo + ชื่อไซต์ — ลักษณะเดียว mockup (ขนาด, ช่องว่าง) | `template-parts/navbar.php` | ตรง mockup |
| 1.3 | เมนูหลัก Desktop — รายการและสไตล์ลิงก์ (สี, hover) | `template-parts/navbar.php` | ตรง mockup |
| 1.4 | ปุ่มภาษา — เปิด/ปิด modal (ถ้าไม่ใช้หลายภาษา ให้ซ่อนหรือไม่แสดง) | `template-parts/navbar.php`, JS | คลิกแล้ว modal เปิด/ปิด |
| 1.5 | ปุ่มค้นหา — เปิด Search overlay | `template-parts/navbar.php`, `search-modal.php` | คลิกแล้ว overlay แสดง, ปิดได้ |
| 1.6 | Mobile: ปุ่มฮัมเบอร์เกอร์ + เมนู drawer ด้านขวา | `template-parts/navbar.php`, CSS/JS | มือถือเปิดเมนูได้, ปิดได้ |
| 1.7 | Search overlay — layout + Popular searches (เท่าที่ mockup มี) | `template-parts/search-modal.php` | ตรง mockup, โฟกัสที่ input เมื่อเปิด |

**ทดสอบ Phase 1:** เปรียบเทียบ header กับ mockup ทุก breakpoint (mobile/tablet/desktop), ตรวจการเปิด/ปิด search และเมนูมือถือ

---

### Phase 2: Hero หน้าแรก (จาก Slider เป็น Hero เดี่ยว)

**วัตถุประสงค์:** หน้าแรกมี Hero แบบเดียว mockup — 1 ข่าวเด่น (ข้อความซ้าย, รูปขวา)

| ลำดับ | ขั้นตอน | ไฟล์ที่แก้ | เกณฑ์ทดสอบ |
|-------|----------|------------|-------------|
| 2.1 | สร้าง template part ใหม่ `hero-single.php` หรือแก้ `hero-section.php` — เลย์เอาต์ grid 2 คอลัมน์ (ข้อความซ้าย, รูปขวา), ข้อมูลจากโพสต์ล่าสุดหรือโพสต์ที่เลือก | `template-parts/hero-section.php` หรือ `hero-single.php` | หน้าแรกแสดง Hero เดี่ยว 1 รายการ |
| 2.2 | ปุ่ม/ลิงก์ "อ่านเรื่องราว" ชี้ไปยัง URL โพสต์ | ใน hero template part | คลิกแล้วไป single post |
| 2.3 | หมวดหมู่ของข่าวเด่นแสดงเป็นข้อความลิงก์ (เช่น "Artificial Intelligence") | ใน hero template part | ตรง mockup, ลิงก์ไป archive หมวด |
| 2.4 | ใน `home.php` เรียกใช้ hero เดี่ยวแทน slider (หรือสลับตาม option) | `home.php` | หน้าแรกไม่มี slider, มีเฉพาะ hero เดี่ยว |

**ทดสอบ Phase 2:** เปรียบเทียบกับ `mockup/index.html` — โครงและลำดับเนื้อหาเหมือนกัน

---

### Phase 3: Category Filters (Pills + Mobile Dropdown)

**วัตถุประสงค์:** หน้าแรกและ/หรือ archive มี filter หมวดหมู่ — Desktop: pills แนวนอน, Mobile: dropdown

| ลำดับ | ขั้นตอน | ไฟล์ที่แก้ | เกณฑ์ทดสอบ |
|-------|----------|------------|-------------|
| 3.1 | ปรับ `category-filters.php` — Desktop: แสดง pills (ลิงก์ไป archive หมวด) สไตล์ตรง mockup | `template-parts/category-filters.php` | ตรง mockup desktop |
| 3.2 | เพิ่มบล็อก Mobile: ปุ่มแสดง "หมวดที่เลือก" + dropdown รายการหมวด | `template-parts/category-filters.php` | มือถือเห็นปุ่มและ dropdown |
| 3.3 | JS: เลือกหมวดใน dropdown แล้วอัปเดตข้อความปุ่มและปิด dropdown, คลิกนอกแล้วปิด | `assets/js/main.js` หรือไฟล์แยก | พฤติกรรมตรง mockup |
| 3.4 | ใส่ category filters ใน `home.php` (ใต้ hero) และใน `archive.php` (ถ้า mockup category มี) | `home.php`, `archive.php` | แสดงในหน้าที่กำหนด |

**ทดสอบ Phase 3:** เปรียบเทียบกับ mockup หน้าแรกและ category — mobile/desktop ตรง

---

### Phase 4: News Grid & Load More / Pagination

**วัตถุประสงค์:** กริดข่าวและปุ่ม Load more / Pagination ตรง mockup

| ลำดับ | ขั้นตอน | ไฟล์ที่แก้ | เกณฑ์ทดสอบ |
|-------|----------|------------|-------------|
| 4.1 | ปรับ `news-card.php` — โครงและ class (รูป, หมวด, หัวข้อ, excerpt, วันที่) ให้ตรง mockup | `template-parts/news-card.php` | การ์ดตรง mockup |
| 4.2 | ปรับ `home.php` — จำนวนคอลัมน์และ gap ของ grid | `home.php` | ตรง mockup หน้าแรก |
| 4.3 | ปุ่ม "Load more stories" — สไตล์และตำแหน่ง | `home.php` | ตรง mockup, คลิกโหลดเพิ่มได้ (ถ้ามี AJAX) |
| 4.4 | หน้า archive: กริดบทความ + Pagination (เลขหน้า/ปุ่มก่อน-ถัดไป) | `archive.php`, `template-parts/pagination.php` | ตรง mockup category |

**ทดสอบ Phase 4:** เปรียบเทียบกริดและปุ่มกับ mockup, ทดสอบ load more และเปลี่ยนหน้า

---

### Phase 5: Footer

**วัตถุประสงค์:** โครงและสไตล์ footer ตรง mockup (About, More from us, Support, Subscribe, Social, Copyright)

| ลำดับ | ขั้นตอน | ไฟล์ที่แก้ | เกณฑ์ทดสอบ |
|-------|----------|------------|-------------|
| 5.1 | โครง 4 คอลัมน์ + หัวข้อและลิงก์ตาม mockup | `footer.php` | โครงตรง mockup |
| 5.2 | สไตล์ (สี, ฟอนต์, ขอบ, พื้นหลัง) ตรง mockup | `footer.php`, Tailwind | ตรง mockup |
| 5.3 | ช่อง Newsletter + ปุ่ม Sign up | `footer.php` | ตรง mockup, ส่งได้ (หรือแค่ UI ก่อน) |
| 5.4 | ไอคอนโซเชียล (Facebook, Twitter, Instagram) ลิงก์จาก theme options ถ้ามี | `footer.php` | ตรง mockup |
| 5.5 | บาร์ล่าง: Logo (เล็ก/grayscale), Copyright, ลิงก์ Help/Privacy/Terms | `footer.php` | ตรง mockup |

**ทดสอบ Phase 5:** เปรียบเทียบกับ `mockup/components/footer.html` ทุก breakpoint

---

### Phase 6: Search Modal & Back to Top

**วัตถุประสงค์:** Search overlay และปุ่ม Back to top ตรง mockup

| ลำดับ | ขั้นตอน | ไฟล์ที่แก้ | เกณฑ์ทดสอบ |
|-------|----------|------------|-------------|
| 6.1 | Search overlay — full overlay, ช่องค้นหา, ปุ่มปิด, Popular searches | `template-parts/search-modal.php` | ตรง mockup, เปิด/ปิดได้ |
| 6.2 | การค้นหา: submit ไป search URL ของ WordPress หรือ AJAX ตามที่ theme มี | `template-parts/search-modal.php`, JS | ค้นหาแล้วได้ผลลัพธ์ถูกต้อง |
| 6.3 | Back to top — แสดงเมื่อ scroll > 300px, ปุ่มมุมล่างขวา, คลิกแล้ว scroll ขึ้น | `footer.php`, JS | ตรง mockup และพฤติกรรม |

**ทดสอบ Phase 6:** เปิด overlay ค้นหา, scroll ลงแล้วเช็กปุ่ม back to top

---

### Phase 7: หน้าหมวดหมู่ (Archive) — Breadcrumb & Layout

**วัตถุประสงค์:** หน้าหมวดหมู่/แท็ก/ผู้เขียน ตรง mockup category

| ลำดับ | ขั้นตอน | ไฟล์ที่แก้ | เกณฑ์ทดสอบ |
|-------|----------|------------|-------------|
| 7.1 | Breadcrumb: หน้าแรก / ชื่อหมวด (หรือแท็ก/ผู้เขียน) | `template-parts/breadcrumb.php` | ตรง mockup |
| 7.2 | Category hero: หัวข้อ H1 + คำอธิบายหมวด (จาก description) | `archive.php` | ตรง mockup |
| 7.3 | กริดบทความ + Pagination | ใช้จาก Phase 4 | ตรง mockup |

**ทดสอบ Phase 7:** เปรียบเทียบกับ `mockup/category.html`

---

### Phase 8: หน้า Single (บทความ)

**วัตถุประสงค์:** หน้า single post ตรง mockup single

| ลำดับ | ขั้นตอน | ไฟล์ที่แก้ | เกณฑ์ทดสอบ |
|-------|----------|------------|-------------|
| 8.1 | Breadcrumb, หัวข้อ, วันที่, หมวด, เนื้อหา | `single.php` | ตรง mockup |
| 8.2 | Sidebar (ถ้าเปิดใช้) ไม่บังเนื้อหาหลัก | `single.php`, CSS | layout ถูกต้อง |
| 8.3 | Social share, TOC, อื่นๆ ตาม mockup | template-parts ที่เกี่ยวข้อง | ตรง mockup |

**ทดสอบ Phase 8:** เปรียบเทียบกับ `mockup/single.html`

---

### Phase 9: หน้า Search, 404, และ Page ทั่วไป

**วัตถุประสงค์:** หน้าค้นหา, 404, เกี่ยวกับเรา, ติดต่อ, ฯลฯ ตรง mockup

| ลำดับ | ขั้นตอน | ไฟล์ที่แก้ | เกณฑ์ทดสอบ |
|-------|----------|------------|-------------|
| 9.1 | หน้า Search — หัวข้อ, ฟอร์ม, ผลลัพธ์ | `search.php` | ตรง mockup/search.html |
| 9.2 | 404 — ข้อความและลิงก์กลับ | `404.php` | ตรง mockup/404.html |
| 9.3 | About, Contact, FAQ, Privacy, Terms — ใช้ page template หรือ `page.php`; layout ตรง mockup | `page.php` หรือ `page-about.php` ฯลฯ | แต่ละหน้ากำหนดตาม mockup |

**ทดสอบ Phase 9:** เปิดแต่ละประเภทหน้าและเปรียบเทียบกับ mockup

---

### Phase 10: ปรับแต่งสุดท้ายและ Cross-browser

**วัตถุประสงค์:** จบความต่างที่เหลือและทดสอบหลายอุปกรณ์/เบราว์เซอร์

| ลำดับ | ขั้นตอน | ไฟล์ที่แก้ | เกณฑ์ทดสอบ |
|-------|----------|------------|-------------|
| 10.1 | ตรวจทุกหน้ารวม author, tag, sitemap (ถ้า mockup มี) | ตาม template ที่ใช้ | ตรง mockup |
| 10.2 | ปรับ responsive — ไม่ overflow, เมนูและ dropdown ใช้งานได้ | CSS/JS | mobile/tablet/desktop |
| 10.3 | ทดสอบใน Chrome, Firefox, Safari (หรือ Edge) | - | ไม่มี layout พัง |
| 10.4 | ตรวจ accessibility พื้นฐาน (focus, aria) | ตามความเหมาะสม | Tab และ screen reader พื้นฐาน |

**ทดสอบ Phase 10:** สรุป checklist เปรียบเทียบ mockup กับ theme ทุกหน้าที่สำคัญ

---

## 5. สรุป Plugin (ย่อ)

- **ไม่บังคับ:** Carbon Fields (theme ใช้ Options API + meta box อยู่แล้ว)
- **แนะนำเมื่อมีฟีเจอร์จริง:** Contact Form 7 (หน้า Contact), Plugin Newsletter (ถ้าต้องการระบบส่งเมล), WPML/Polylang (ถ้าต้องหลายภาษา)

---

## 6. สรุปการแบ่งส่วนแสดงผล (ย่อ)

| ส่วน | ไฟล์ Theme หลัก |
|------|------------------|
| Header | `header.php`, `template-parts/navbar.php` |
| Search overlay | `template-parts/search-modal.php` |
| Language modal | ส่วนใหม่หรือใน footer + JS |
| Hero หน้าแรก | `template-parts/hero-section.php` (หรือ hero-single) |
| Category filters | `template-parts/category-filters.php` |
| Body (grid/list/single) | `home.php`, `archive.php`, `single.php`, `search.php`, `page.php`, `404.php` |
| News/Article card | `template-parts/news-card.php` |
| Breadcrumb | `template-parts/breadcrumb.php` |
| Pagination | `template-parts/pagination.php` |
| Footer | `footer.php` |
| Back to top | ปุ่มใน `footer.php` + JS |

---

## 7. หลักการทำงาน

- **ทำทีละ Phase** — ทำครบขั้นตอนใน Phase นั้นแล้วทดสอบให้ผ่านก่อนไป Phase ถัดไป
- **อ้างอิง mockup เป็นหลัก** — เปิดไฟล์ mockup คู่กับหน้าที่กำลังแก้
- **ไม่เปลี่ยน logic หลักโดยไม่จำเป็น** — เช่น ยังใช้ `get_option`, เมนู WordPress, โครง header/footer เดิม แล้วค่อยปรับ markup และ class
- **Build Tailwind หลังแก้ config** — หลังแก้ `tailwind.config.js` หรือไฟล์ CSS ที่ Tailwind อ่าน ต้อง build/compile แล้วรีเฟรชหน้า
- **เก็บรายการ “สิ่งที่ทำแล้ว” ใน Phase** — เพื่อกันพลาดและใช้เป็นบันทึกสำหรับทีม

เมื่อทำครบทุก Phase ตามแผนนี้ Theme Chrysoberyl จะแสดงผลและพฤติกรรมตรงกับ Mockup ที่มีอยู่ครบทุกหน้า และสามารถระบุได้ชัดเจนว่าหน้า/ส่วนใดยังต้องปรับเพิ่ม (ถ้ามี).
