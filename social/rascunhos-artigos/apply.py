import json, sys, re, importlib
sys.path.insert(0,'.')
mods = sys.argv[1:]
A = {}
for m in mods: A.update(importlib.import_module(m).A)
R='/home/claude/simple-romantic/'
J=lambda s: json.dumps(s, ensure_ascii=False)
def entry(a, lang, ptslug):
    d=a[lang]; conto=a['kind']=='conto'
    notice={'pt':("CONTO FICTÍCIO","Esta história é uma obra de ficção. Personagens e acontecimentos foram criados para esta publicação."),
            'es':("CUENTO FICTICIO","Esta historia es una obra de ficción. Los personajes y los hechos han sido creados para esta publicación."),
            'en':("FICTIONAL STORY","This story is a work of fiction. The characters and events were created for this post.")}[lang]
    o=["  {",f"    slug: {J(d['slug'])},",f"    title: {J(d['title'])},"]
    if d.get('seoTitle'): o.append(f"    seoTitle: {J(d['seoTitle'])},")
    o+= [f"    excerpt: {J(d['excerpt'])},",f"    category: {J(d['category'])},",f"    series: {J(a['series'])},"]
    if conto: o.append(f"    contentNotice: {{ label: {J(notice[0])}, text: {J(notice[1])} }},")
    o+= [f"    image: {J(a['image'])},",f"    imageAlt: {J(d['alt'])},",f"    published: {J(d['pub'])},",f"    publishedIso: {J(a['date'])},",f"    readTime: {J(d['rt'])},"]
    if lang!='pt': o.append(f"    translationOf: {J(ptslug)},")
    o.append("    intro: ["+", ".join(J(x) for x in d['intro'])+"],")
    o.append("    sections: [")
    for s in d['sections']:
        p=[f"heading: {J(s['h'])}"]
        if s.get('paragraphs'): p.append("paragraphs: ["+", ".join(J(x) for x in s['paragraphs'])+"]")
        if s.get('items'): p.append("items: ["+", ".join(J(x) for x in s['items'])+"]")
        if s.get('link'):
            b,t,h,af=s['link']; p.append(f"paragraphLink: {{ before: {J(b)}, linkText: {J(t)}, href: {J(h)}, after: {J(af)} }}")
        o.append("      { "+", ".join(p)+" },")
    o+=["    ],","  },"]
    return "\n".join(o)+"\n"
def append(path, text):
    s=open(R+path,encoding='utf-8').read()
    i=s.rindex("\n];")
    s=s[:i+1]+text+s[i+1:]
    open(R+path,'w',encoding='utf-8').write(s)
for k,a in A.items():
    pt=a['pt']['slug']
    if pt in open(R+'app/blog/posts.ts',encoding='utf-8').read(): print('skip',pt); continue
    append('app/blog/posts.ts', entry(a,'pt',pt))
    append('app/es/blog/parts/part-B.ts', entry(a,'es',pt))
    append('app/en/blog/parts/part-F.ts', entry(a,'en',pt))
    t=open(R+'app/blog/translations.ts',encoding='utf-8').read()
    row=f'  {{ pt: {J(pt)}, es: {J(a["es"]["slug"])}, en: {J(a["en"]["slug"])} }},\n'
    i=t.index("\n] as const;")
    t=t[:i+1]+row+t[i+1:]
    open(R+'app/blog/translations.ts','w',encoding='utf-8').write(t)
    print('added',pt)
