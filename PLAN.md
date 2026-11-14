# Portfolyo Sitesi — Uygulama Spesifikasyonu (Sonnet için)

> Bu doküman başka bir oturumda (Claude Sonnet) kodlama yapılması için hazırlandı. Kararların hepsi kullanıcıyla netleştirildi; **yeniden soru sormadan** aşağıdakileri birebir uygula. Belirsiz kalan küçük detaylarda makul varsayım yap ve sonunda listele.

## 1. Bağlam
- Yazılım geliştirici için **tek sayfalık, sunucusuz (statik)** kişisel portfolyo.
- Çalışma klasörü: `/Users/Yusuf/claude/d2` (şu an boş).
- **Saf HTML + CSS + vanilla JS.** Build adımı, npm, framework, bundler YOK. Harici bağımlılık yalnızca Google Fonts.
- Site içeriği **sadece İngilizce**.
- Yayın hedefi: **GitHub Pages** (repo kökünden, `main` branch).
- İçerik ilk aşamada **gerçekçi yer tutucu** verilerle gelir; kullanıcı sonra yalnızca `js/data.js`'i düzenleyerek doldurur.

## 2. Dosya yapısı (tam olarak bu)
```
index.html
css/style.css
js/data.js
js/main.js
assets/favicon.svg
assets/avatar.svg        # yer tutucu profil görseli (baş harfler, pastel daire)
assets/og-image.svg      # 1200x630 yer tutucu paylaşım görseli (README'de PNG'ye çevirme notu)
assets/projects/*.svg    # her proje için basit pastel yer tutucu kapak (6 adet)
README.md
.nojekyll                # boş dosya
```
`assets/cv.pdf` oluşturulmaz; README'de "buraya kendi CV'ni koy" notu olur. CV butonu `data.js` içindeki `cvUrl` (varsayılan `assets/cv.pdf`) ile çalışır, `download` attribute'u taşır.

## 3. Tasarım sistemi

### Renk paleti — sıcak pastel, açık tema
**Mercan (coral) KULLANILMAYACAK.** Ana vurgu daha sıcak bir terrakota/yanık turuncu.
```css
:root {
  --bg:            #FBF5EC;  /* krem zemin */
  --bg-alt:        #F4EADB;  /* alternatif bölüm zemini */
  --surface:       #FFFDF9;  /* kart yüzeyi */
  --text:          #2B2118;  /* koyu kahve, ana metin */
  --text-muted:    #6B5B4D;
  --border:        #E6D8C4;

  --accent:        #D9643A;  /* terrakota / yanık turuncu — ana vurgu, CTA */
  --accent-strong: #B84E28;  /* hover / aktif */
  --accent-soft:   #F6D9C8;  /* chip/arka plan tonu */

  --mustard:       #E3A72F;  /* hardal sarısı — ikincil vurgu */
  --mustard-soft:  #F8E7BE;
  --mint:          #7FBFA4;  /* nane — üçüncül vurgu */
  --mint-soft:     #D8EEE3;

  --shadow: 0 10px 30px -12px rgba(120, 70, 30, 0.25);
  --radius: 20px;
  --radius-sm: 12px;
}
```
- Body mutlaka `background: var(--bg); color: var(--text);`.
- Metin/zemin kontrastı WCAG AA (normal metin ≥ 4.5:1). Turuncu buton üstündeki metin beyaz değilse koyu kahve kullan; beyaz metin için `--accent-strong` zemini tercih et.
- Koyu tema YOK (kullanıcı açık pastel tema seçti).

### Tipografi
- Google Fonts: başlıklar **"Fraunces"** (600–700), gövde **"Inter"** (400/500/600). `display=swap`, `preconnect` ekle.
- Ölçek: `h1` `clamp(2.6rem, 6vw, 4.8rem)`, `h2` `clamp(1.9rem, 4vw, 2.8rem)`, gövde `1.05rem`, satır yüksekliği 1.65.

### Layout
- İçerik genişliği: `max-width: 1120px; margin-inline: auto; padding-inline: 16px` (≥768px'te 24px).
- Bölümler arası dikey boşluk `clamp(72px, 10vw, 128px)`.
- Mobil 375px'te **yatay kaydırma olmamalı** (`overflow-x: clip` body'de güvenlik ağı, ama asıl çözüm taşan eleman olmaması).
- Kartlar: `--surface` zemin, `--radius`, `--shadow`, 1px `--border`; hover'da `translateY(-6px)` + gölge artışı (transition 250ms).
- Dekoratif öğeler: hero'da 3 adet bulanık pastel "blob" (accent-soft, mustard-soft, mint-soft), `position:absolute`, `filter: blur(40px)`, yavaş yüzen keyframe animasyonu (12–18s). `aria-hidden="true"`, `pointer-events:none`.

## 4. `js/data.js` — içerik şeması
Global tek nesne: `window.PORTFOLIO = { ... }`. `main.js` her şeyi buradan render eder. Yer tutucu değerler gerçekçi İngilizce olsun.
```js
window.PORTFOLIO = {
  name: "Alex Morgan",
  initials: "AM",
  title: "Software Developer",            // SEO + statik fallback
  roles: ["Full-Stack Developer", "Frontend Enthusiast", "Problem Solver", "Open Source Contributor"],
  tagline: "I build fast, accessible and delightful web experiences.",
  location: "Istanbul, Turkey",
  email: "hello@example.com",
  cvUrl: "assets/cv.pdf",
  avatar: "assets/avatar.svg",
  about: [
    "Paragraph 1 ...",
    "Paragraph 2 ..."
  ],
  stats: [
    { value: "5+", label: "Years of experience" },
    { value: "30+", label: "Projects shipped" },
    { value: "12", label: "Open source repos" }
  ],
  skills: [
    { category: "Languages", items: ["JavaScript", "TypeScript", "Python", "SQL"] },
    { category: "Frontend",  items: ["React", "Vue", "HTML", "CSS", "Tailwind"] },
    { category: "Backend",   items: ["Node.js", "Express", "PostgreSQL", "MongoDB"] },
    { category: "Tools",     items: ["Git", "Docker", "Figma", "Vercel", "Jest"] }
  ],
  experience: [
    { role: "Senior Frontend Developer", company: "Acme Corp", period: "2023 — Present",
      points: ["...", "...", "..."] },
    // toplam 3 kayıt
  ],
  education: [
    { degree: "B.Sc. Computer Engineering", school: "Example University", period: "2015 — 2019" }
  ],
  projects: [
    { title: "TaskFlow", description: "...", image: "assets/projects/taskflow.svg",
      category: "Web", tech: ["React", "Node.js", "PostgreSQL"],
      live: "https://example.com", code: "https://github.com/example/taskflow" },
    // toplam 6 proje; category değerleri: "Web", "Mobile", "AI", "Tools" (her birinden en az 1)
    // live veya code boş string olabilir → o link render edilmez
  ],
  socials: [
    { name: "GitHub",   url: "https://github.com/example",       icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/example",  icon: "linkedin" },
    { name: "X",        url: "https://x.com/example",            icon: "x" }
  ]
};
```

## 5. `index.html`
- `<!doctype html>`, `lang="en"`, `charset`, `viewport`.
- **`<head>` SEO (statik, JS'e bağlı değil):**
  - `<title>Alex Morgan — Software Developer</title>`
  - `meta description` (~150 karakter)
  - `link rel="canonical"` (yer tutucu `https://username.github.io/`)
  - Open Graph: `og:type=website`, `og:title`, `og:description`, `og:url`, `og:image` (`assets/og-image.svg`; README'de PNG önerisi)
  - Twitter: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`
  - `theme-color` = `#FBF5EC`
  - Favicon: `link rel="icon" type="image/svg+xml" href="assets/favicon.svg"`
  - JSON-LD `<script type="application/ld+json">` — `@type: Person`, `name`, `jobTitle`, `url`, `email`, `sameAs` (sosyal URL'ler), `address.addressLocality`.
  - Not README'ye: isim değişince `<head>`'deki statik alanlar da elle güncellenmeli.
- `<body>` yapısı:
  - `<a class="skip-link" href="#main">Skip to content</a>`
  - `<header class="nav">`: solda logo (initials, Fraunces), sağda `<nav>` linkleri: Home, About, Skills, Experience, Projects, Contact (anchor). Mobilde (<768px) hamburger `<button aria-expanded aria-controls>`; açılınca tam genişlik panel. Link tıklanınca menü kapanır. Scroll > 10px olunca header'a hafif blur arka plan + gölge (`.nav--scrolled`).
  - `<main id="main">` içinde sırayla `section#home`, `section#about`, `section#skills`, `section#experience`, `section#projects`, `section#contact`. Her bölümde `h2` ve boş render konteynerleri (`data-render="skills"` vb. veya id'ler).
  - Hero (`#home`) statik fallback içeriği HTML'de olsun (isim + title); JS yüklenince data'dan güncellenir.
  - `<footer>`.
  - `<noscript>`: "Please enable JavaScript to view the full portfolio."
  - Scriptler `<body>` sonunda: önce `js/data.js`, sonra `js/main.js` (ikisi de `defer` olabilir, sıra korunur).
- `html { scroll-behavior: smooth; }` ve sticky header için bölümlere `scroll-margin-top: 80px`.

## 6. Bölüm detayları
1. **Hero (#home)** — min-height ~90vh, ortalanmış veya sola yaslı.
   - Küçük üst etiket: "👋 Hi, I'm" (emoji yerine küçük pastel rozet de olabilir).
   - `h1` = name.
   - Typewriter satırı: `I'm a <span class="typewriter"></span><span class="caret" aria-hidden="true">|</span>` — `roles` dizisini sırayla yazar/siler.
   - Tagline paragrafı.
   - CTA'lar: birincil "View Projects" (`#projects`, accent zemin), ikincil "Download CV" (çerçeveli, `href=cvUrl`, `download`, indirme ikonu).
   - Sosyal ikonlar küçük satır halinde.
   - Arka planda blob'lar.
2. **About (#about)** — 2 kolon (≥900px), mobilde tek kolon. Solda avatar (yuvarlak/organik şekil maskesi, arkasında mustard-soft kaydırılmış şekil), sağda `about` paragrafları + `stats` kutuları (3 küçük kart, değer Fraunces büyük, farklı pastel zeminler: accent-soft / mustard-soft / mint-soft).
3. **Skills (#skills)** — `--bg-alt` zemin. Her kategori bir kart; başlık + chip listesi. Chip renkleri kategoriye göre döngüsel (accent-soft, mustard-soft, mint-soft, accent-soft). Grid: `repeat(auto-fit, minmax(240px, 1fr))`.
4. **Experience (#experience)** — dikey zaman çizelgesi: solda ince çizgi (`--border`), her kayıtta accent renkli nokta. Kayıt: rol (bold), şirket (accent), dönem (muted, küçük), madde listesi. Altında "Education" alt başlığı ve aynı stilde kayıt(lar).
5. **Projects (#projects)** —
   - Üstte filtre bar: "All" + `projects` içindeki benzersiz `category` değerleri (veri sırasına göre, otomatik). Butonlar `role="group" aria-label="Filter projects"`, her buton `aria-pressed`. Aktif buton accent zemin.
   - Grid: `repeat(auto-fill, minmax(300px, 1fr))` (mobilde tek kolon, `minmax(min(300px,100%),1fr)` kullan ki 375px'te taşmasın).
   - Kart: kapak görseli (`aspect-ratio: 16/10; object-fit: cover`, `loading="lazy"`, `alt` = title), kategori rozeti, başlık, açıklama, tech etiketleri (küçük chip), alt kısımda "Live ↗" ve "Code" linkleri (`target="_blank" rel="noopener noreferrer"`).
   - Filtreleme: eşleşmeyen kartlara `hidden` attribute; geçişte kısa fade/scale (reduced-motion'da yok). Sonuç sayısını `aria-live="polite"` görünmez bir span'de duyur ("Showing 3 projects").
6. **Contact (#contact) + Footer** —
   - Büyük başlık "Let's build something together", kısa paragraf, büyük mailto butonu (`mailto:` + email), sosyal ikonlar (inline SVG: github, linkedin, x; her linkte `aria-label`).
   - **Form YOK.**
   - Footer satırı: `© {yıl} {name}. Built with HTML, CSS & JS.` ve **güncel tarih** gösterimi: JS ile `new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })` → örn. "November 14, 2026". Telif yılı da `getFullYear()` ile otomatik. Tarih `<time datetime="YYYY-MM-DD">` içinde.
   - "Back to top ↑" linki.

## 7. `js/main.js` — davranış
Tek IIFE veya modül; `'use strict'`. Fonksiyonlar:
- `escapeHTML(str)` — data'dan gelen tüm metinler innerHTML'e girmeden kaçışlansın (ya da `textContent`/`createElement` kullan).
- `renderHero()`, `renderAbout()`, `renderSkills()`, `renderExperience()`, `renderProjects()`, `renderFilters()`, `renderContact()`, `renderFooter()`.
- `icons` nesnesi: `github`, `linkedin`, `x`, `download`, `external`, `code`, `mail` için inline SVG string'leri (`aria-hidden="true"`, `currentColor`).
- `initTypewriter(el, roles)` — yazma hızı ~70ms/karakter, silme ~40ms, kelime sonunda 1600ms bekle, döngüsel. Caret CSS ile yanıp söner. `prefers-reduced-motion: reduce` ise animasyon yok, sadece `roles[0]` statik yazılır. Ekran okuyucular için typewriter span'ine `aria-hidden="true"` ver ve yanına görünmez (`.sr-only`) statik metin koy: roles listesinin `, ` ile birleşimi.
- `initFilters()` — buton tıklamasında aktif durumu ve kart görünürlüğünü günceller, aria-live sayaç.
- `initReveal()` — `.reveal` sınıflı öğeleri IntersectionObserver (`threshold: 0.15`, `rootMargin: '0px 0px -10% 0px'`) ile görünür olunca `.is-visible` ekler, sonra unobserve. Kartlarda küçük kademeli gecikme (`style.transitionDelay = i*80ms`, max 400ms). IntersectionObserver yoksa veya reduced-motion ise hepsine doğrudan `.is-visible`.
- `initNav()` — hamburger aç/kapa (`aria-expanded`, Escape ile kapanır, link tıklanınca kapanır), scroll'da `.nav--scrolled`, aktif bölüm vurgusu (IntersectionObserver ile ilgili nav linkine `aria-current="true"`).
- `DOMContentLoaded`'da: render'lar → init'ler. `window.PORTFOLIO` yoksa konsola anlamlı hata yaz ve statik fallback kalsın.

## 8. CSS animasyon & erişilebilirlik
- `.reveal { opacity:0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }` `.reveal.is-visible { opacity:1; transform:none; }`
- `@media (prefers-reduced-motion: reduce)` içinde: tüm `animation`/`transition` kapalı, `.reveal` direkt görünür, blob animasyonu durur, `scroll-behavior: auto`.
- Görünür odak halkası: `:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }`.
- `.sr-only` yardımcı sınıfı.
- Tüm interaktif öğeler klavye ile erişilebilir; dokunma hedefleri ≥ 44px.

## 9. Yer tutucu görseller (SVG, el yazımı)
- `favicon.svg`: terrakota daire içinde krem renkli "AM" (Fraunces benzeri serif, font-family fallback `Georgia, serif`).
- `avatar.svg`: 400x400, mustard-soft zemin, accent daire, ortada initials.
- `og-image.svg`: 1200x630, krem zemin, blob şekilleri, isim + title.
- `assets/projects/*.svg`: 6 adet, 800x500, her biri farklı pastel gradyan + basit geometrik şekiller + proje adı.

## 10. README.md (İngilizce veya Türkçe — **Türkçe** yaz, kullanıcı Türk)
İçerik:
1. Proje tanıtımı ve dosya yapısı.
2. Yerelde çalıştırma: `python3 -m http.server 8000` → `http://localhost:8000`.
3. İçeriği düzenleme: `js/data.js` alanlarının açıklaması; `<head>` içindeki statik SEO alanlarını (title, description, OG, JSON-LD, canonical) da güncelleme hatırlatması.
4. CV ekleme: `assets/cv.pdf`.
5. Görselleri değiştirme; OG görselini 1200x630 PNG'ye çevirme önerisi (bazı platformlar SVG OG görselini göstermez).
6. GitHub Pages yayını: `username.github.io` adlı repo oluştur → dosyaları push et → Settings › Pages › Source: `main` / `/ (root)` → birkaç dakika sonra `https://username.github.io`. `.nojekyll` dosyasının amacı.
7. Renkleri değiştirme: `css/style.css` başındaki `:root` token'ları.

## 11. Doğrulama (uygulama sonrası mutlaka yap)
1. `python3 -m http.server 8000` (arka planda) → built-in browser ile `http://localhost:8000` aç.
2. Konsolda hata yok (`read_console_messages`, onlyErrors).
3. Tüm bölümler data.js'ten render ediliyor; typewriter dönüyor; footer'da güncel tarih ve yıl doğru.
4. Filtre: "AI" seçilince yalnızca AI kartları görünüyor, "All" ile hepsi geri geliyor, `aria-pressed` doğru.
5. Nav anchor'ları doğru bölüme kayıyor, sticky header başlığı örtmüyor; aktif link vurgusu çalışıyor.
6. Mobil (resize 375x812): hamburger açılıp kapanıyor, `document.documentElement.scrollWidth <= window.innerWidth` (yatay taşma yok).
7. CV butonu `assets/cv.pdf`'e işaret ediyor ve `download` attribute'u var.
8. `data.js`'te bir projeyi silip/ekleyip sayfayı yenile → grid ve filtre butonları otomatik güncelleniyor.
9. Head'de OG/Twitter/JSON-LD mevcut (JSON-LD geçerli JSON).
10. Bitince sunucuyu durdur ve kullanıcıya yapılanları + varsayımları özetle.

## 12. Kapsam dışı
- İletişim formu, backend, analytics, blog, çoklu dil, koyu tema, framework/build araçları.
