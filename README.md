# Portfolyo Sitesi

Saf HTML + CSS + vanilla JS ile yazılmış, tek sayfalık, statik kişisel portfolyo. Build adımı, npm veya framework yok; yalnızca Google Fonts harici bağımlılıktır.

## Dosya yapısı

```
index.html
css/style.css
js/data.js        # tüm içerik burada
js/main.js        # data.js'ten render eder
assets/           # favicon, avatar, og-image, projects/*.svg
.nojekyll
```

## Yerelde çalıştırma

```bash
python3 -m http.server 8000
```

Sonra `http://localhost:8000` adresini aç.

## İçeriği düzenleme

Tüm içerik `js/data.js` içindeki `window.PORTFOLIO` nesnesindedir:

- `name`, `initials`, `title`, `roles` (typewriter), `tagline`, `location`, `email`
- `cvUrl`, `avatar`
- `about` (paragraf listesi), `stats`
- `skills` (kategori + öğeler), `experience`, `education`
- `projects` (`category` değerleri filtre butonlarını otomatik üretir; `live` veya `code` boş bırakılırsa o link gösterilmez)
- `socials` (`icon`: `github`, `linkedin`, `x`)

> **Önemli:** `index.html` içindeki `<head>` alanları statiktir (JS'e bağlı değildir). İsmini veya bilgilerini değiştirdiğinde `title`, `meta description`, `canonical`, Open Graph / Twitter etiketleri ve JSON-LD bloğunu da elle güncelle. `ycimcoz-cmd.github.io` yer tutucularını kendi adresinle değiştir.

## CV ekleme

Kendi CV'ni `assets/cv.pdf` olarak koy. Farklı bir yol kullanırsan `cvUrl` değerini güncelle.

## Görselleri değiştirme

`assets/avatar.svg` ve `assets/projects/*.svg` dosyalarını kendi görsellerinle değiştir (ve `data.js` yollarını güncelle). `assets/og-image.svg` için: bazı platformlar (Facebook, LinkedIn, X vb.) SVG OG görsellerini göstermez; 1200x630 **PNG**'ye çevirip (`og-image.png`) `index.html` içindeki `og:image` ve `twitter:image` etiketlerini güncellemeni öneririz.

## GitHub Pages ile yayınlama

1. `ycimcoz-cmd.github.io` adlı bir repo oluştur (`username` yerine GitHub kullanıcı adın).
2. Dosyaları `main` branch'ine push et.
3. Settings › Pages › Source: `main` / `/ (root)`.
4. Birkaç dakika sonra site `https://ycimcoz-cmd.github.io` adresinde yayında olur.

`.nojekyll` dosyası, GitHub Pages'in Jekyll işlemesini kapatır; dosyalar olduğu gibi servis edilir.

## Renkleri değiştirme

`css/style.css` dosyasının başındaki `:root` token'larını (`--accent`, `--bg`, `--mustard`, `--mint` vb.) düzenle.
