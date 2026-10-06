import Link from "next/link";
import { MobileMenu } from "../../components/MobileMenu";
import { ThemeToggle } from "../../components/ThemeToggle";

export function BlogHeaderEn() {
  const links = [
    { href: "/en", label: "Home" },
    { href: "/en/#encontrar", label: "Find an idea" },
    { href: "/en/#lugares", label: "Places" },
    { href: "/en/#como", label: "How it works" },
    { href: "/en/guide", label: "Free guide" },
    { href: "/en/blog", label: "Blog" },
    { href: "/en/shop", label: "Shop" },
    { href: "/en/community", label: "Community" },
    { href: "/en/between-us", label: "Between us" },
  ];
  return <header className="site-header blog-site-header"><Link className="brand" href="/en"><span className="brand-heart">♥</span><span className="brand-name"><strong>simple</strong><i>& romantic</i><small>SIMPLE MOMENTS · BEAUTIFUL MEMORIES</small></span></Link><nav aria-label="Main navigation"><Link href="/en/#encontrar">Find an idea</Link><Link href="/en/#lugares">Places</Link><Link href="/en/#como">How it works</Link><Link href="/en/guide">Free guide</Link><Link href="/en/blog">Blog</Link><Link href="/en/shop">Shop</Link><Link href="/en/community">Community</Link><Link href="/en/between-us">Between us</Link></nav><div className="header-actions"><ThemeToggle locale="en" /><Link className="language-shortcut" href="/" hrefLang="pt-BR" aria-label="Ver o site em português">PT</Link><Link className="language-shortcut" href="/es" hrefLang="es-ES" aria-label="Ver el sitio en español">ES</Link><Link className="back-home" href="/en">Home</Link><MobileMenu links={links} openLabel="Open menu" closeLabel="Close menu" /></div></header>;
}

export function BlogFooterEn() {
  return <footer><Link className="brand footer-brand" href="/en"><span className="brand-heart">♥</span><span className="brand-name"><strong>simple</strong><i>& romantic</i></span></Link><p>Simple moments. Beautiful memories.</p><small>Free content for real couples, with real budgets.</small><div><Link href="/en">Home</Link><Link href="/en/guide">Free guide</Link><Link href="/en/blog">Blog</Link><Link href="/en/shop">Shop</Link><Link href="/en/community">Community</Link><Link href="/en/between-us">Between us</Link><Link href="/en/privacy">Privacy</Link><Link href="/en/terms">Terms</Link><Link href="/en/community-guidelines">Guidelines</Link><Link href="/en/contact">Contact</Link></div></footer>;
}
