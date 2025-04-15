import ModeToggle from "@/components/internal/mode-toggle";
import Logo from "./logo";
import GithubButton from "./github";

const Header = () => {
  return (
    <header
      className="h-14 sticky top-0 left-0 right-0 bg-white shadow-sm flex items-center justify-between px-4 dark:bg-zinc-900"
      style={{ zIndex: 12 }}
    >
      <div className="flex items-center gap-2">
        <Logo />
      </div>
      <div className="flex items-center gap-6">
        <GithubButton />
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
