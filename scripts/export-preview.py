"""
Gera a prévia do site em um único arquivo HTML, a partir do site de verdade rodando.

Uso (com o site rodando em http://localhost:3005, via `npm run build && npx next start -p 3005`):
    python3 scripts/export-preview.py http://localhost:3005 saida.html [--test-video arquivo.mp4]

O que faz:
- baixa as 9 páginas (pt, en, es × início, sobre, trabalhos) já renderizadas;
- junta o CSS, embute fontes e imagens (imagens uma vez só, reaproveitadas entre páginas);
- empacota lib/experience.ts (a mesma interação do site) com o esbuild;
- troca de página e de idioma sem recarregar, usando #en, #en-sobre etc. no endereço.
Precisa de: Pillow (pip install pillow) e das dependências do projeto (npm install).
"""
import base64
import html
import io
import json
import re
import subprocess
import sys
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
BASE = sys.argv[1].rstrip("/")
OUT = Path(sys.argv[2])
TEST_VIDEO = Path(sys.argv[sys.argv.index("--test-video") + 1]) if "--test-video" in sys.argv else None

PAGES = {
    "pt": "/", "sobre": "/sobre", "trabalhos": "/trabalhos",
    "en": "/en", "en-sobre": "/en/sobre", "en-trabalhos": "/en/trabalhos",
    "es": "/es", "es-sobre": "/es/sobre", "es-trabalhos": "/es/trabalhos",
}


def get(path: str) -> bytes:
    with urllib.request.urlopen(BASE + path) as r:
        return r.read()


def data_uri(raw: bytes, mime: str) -> str:
    return f"data:{mime};base64," + base64.b64encode(raw).decode()


assets: dict[str, str] = {}


def asset_for(src: str) -> str:
    """Registra uma imagem e devolve a chave dela. Fotos são reduzidas para a prévia ficar leve."""
    if src.startswith("/_next/image"):
        src = urllib.parse.parse_qs(urllib.parse.urlparse(src).query)["url"][0]
    if src in assets:
        return src
    raw = get(src)
    if src.endswith(".svg"):
        assets[src] = data_uri(raw, "image/svg+xml")
    else:
        im = Image.open(io.BytesIO(raw)).convert("RGB")
        if im.width > 1400:
            im = im.resize((1400, round(im.height * 1400 / im.width)), Image.LANCZOS)
        buf = io.BytesIO()
        im.save(buf, "JPEG", quality=68, optimize=True, progressive=True)
        assets[src] = data_uri(buf.getvalue(), "image/jpeg")
    return src


css_files: list[str] = []
views: dict[str, dict] = {}
for key, path in PAGES.items():
    page = get(path).decode()
    for href in re.findall(r'<link rel="stylesheet" href="([^"]+)"', page):
        if href not in css_files:
            css_files.append(href)
    body = re.search(r"<body[^>]*>(.*)</body>", page, flags=re.S).group(1)
    body = re.sub(r"<script\b.*?</script>", "", body, flags=re.S)
    body = re.sub(r"<template\b.*?</template>", "", body, flags=re.S)

    def img(m: re.Match) -> str:
        tag = m.group(0)
        src = html.unescape(re.search(r'\ssrc="([^"]+)"', tag).group(1))
        tag = re.sub(r'\s(src|srcSet|srcset|sizes)="[^"]*"', "", tag)
        return tag.replace("<img", f'<img data-asset="{asset_for(src)}"', 1)

    body = re.sub(r"<img\b[^>]*>", img, body)
    views[key] = {
        "lang": re.search(r'<html[^>]*\slang="([^"]+)"', page).group(1),
        "cls": re.search(r'<html[^>]*\sclass="([^"]*)"', page).group(1),
        "title": html.unescape(re.search(r"<title>(.*?)</title>", page).group(1)),
        "body": body,
    }

css = ""
for href in css_files:
    chunk = get(href).decode()

    def font(m: re.Match) -> str:
        url = m.group(1).strip("'\"")
        mime = "font/woff2" if url.endswith(".woff2") else "font/woff"
        return f"url({data_uri(get(url), mime)})"

    chunk = re.sub(r"url\(\.\./media/", "url(/_next/static/media/", chunk)
    css += re.sub(r"url\((/_next/static/media/[^)]+)\)", font, chunk) + "\n"

if TEST_VIDEO:
    assets["test-video"] = data_uri(TEST_VIDEO.read_bytes(), "video/mp4")
    tag = ('<video data-asset="test-video" autoplay muted loop playsinline aria-hidden="true" '
           'style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2"></video>'
           '<div aria-hidden="true" style="position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,var(--pink),var(--blue));mix-blend-mode:color;opacity:.55"></div>'
           '<p style="position:absolute;top:12px;left:16px;margin:0;font-family:var(--f-vhs);font-size:16px;letter-spacing:.06em;color:#fff;text-shadow:1px 1px 0 rgba(0,0,0,.6)">TESTE · VÍDEO DE REFERÊNCIA (VACATION)</p>')
    for v in views.values():
        v["body"] = re.sub(r"(<div[^>]*data-hero[^>]*>)", r"\1" + tag.replace("\\", "\\\\"), v["body"], count=1)

bundle = subprocess.run(
    ["npx", "esbuild", str(ROOT / "lib/experience.ts"), "--bundle", "--minify", "--format=iife", "--global-name=MBX", "--target=es2019"],
    cwd=ROOT, check=True, capture_output=True, text=True,
).stdout

router = r"""
(function(){
  var V=window.__VIEWS, A=window.__ASSETS, app=document.getElementById("app"), cleanup=null, cur=null;
  function keyFromPath(p){ p=p.replace(/\/+$/,""); if(p===""||p==="/")return "pt"; var parts=p.split("/").filter(Boolean);
    if(parts[0]==="en"||parts[0]==="es") return parts[0]+(parts[1]?"-"+parts[1]:""); return parts[0]==="pt"?(parts[1]||"pt"):parts[0]; }
  function scrollToId(id){ var el=id&&document.getElementById(id); if(!el){window.scrollTo(0,0);return;}
    var nav=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"))||0;
    var y=el.getBoundingClientRect().top+window.scrollY-nav; window.scrollTo({top:y,behavior:"smooth"}); }
  function render(key, anchor){
    if(!V[key]) key="pt";
    if(key!==cur){
      if(cleanup){ try{cleanup()}catch(e){} cleanup=null; }
      var v=V[key]; cur=key;
      document.documentElement.lang=v.lang; document.documentElement.className=v.cls; document.title=v.title;
      app.innerHTML=v.body;
      app.querySelectorAll("[data-asset]").forEach(function(el){ el.src=A[el.getAttribute("data-asset")]; if(el.tagName==="VIDEO"){ el.muted=true; var pr=el.play(); if(pr&&pr.catch) pr.catch(function(){}); } });
      window.scrollTo({top:0,left:0,behavior:"instant"});
      try{ cleanup=window.MBX.initExperience(document); }catch(e){ console.error(e); }
    }
    if(anchor) setTimeout(function(){scrollToId(anchor)},60);
  }
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest("a[href]"); if(!a) return;
    var href=a.getAttribute("href"); if(!href||href.charAt(0)!=="/") return;
    e.preventDefault();
    var parts=href.split("#"), key=keyFromPath(parts[0]);
    if(location.hash.slice(1)!==key) history.replaceState(null,"","#"+key);
    render(key, parts[1]);
  }, true);
  window.addEventListener("hashchange",function(){ render(location.hash.slice(1)||"pt"); });
  render(location.hash.slice(1)||"pt");
})();
"""

extra_css = """
/* ajustes só da prévia */
#app { display: contents; }
"""

title = views["pt"]["title"]
out = f"""<meta charset="utf-8">
<title>Muito Bala Home</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>{css}{extra_css}</style>
<div id="app"></div>
<script>window.__VIEWS={json.dumps(views, ensure_ascii=False)};window.__ASSETS={json.dumps(assets)};</script>
<script>{bundle}</script>
<script>{router}</script>
"""
OUT.write_text(out)
print(f"ok: {OUT} ({len(out) // 1024} KB, {len(views)} páginas, {len(assets)} imagens, CSS {len(css) // 1024} KB)")
