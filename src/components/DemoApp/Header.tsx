interface HeaderLink {
  label: string;
  href: string;
}

interface HeaderProps {
  links: HeaderLink[];
}

const Header = ({ links }: HeaderProps) => (
  <header className="bg-gray-800 text-white">
    <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
      <h1 className="text-2xl font-bold">Projects App</h1>
      <nav>
        {links.map((link) => (
          <a key={link.href} href={link.href} className="mx-2 text-gray-300 transition-colors hover:text-white">
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  </header>
);

export default Header;
