import { Address, Contacts, HeaderButtons, HeaderNavigation, Logo } from ".";

export const Header = () => (
  <header
    className={
      "flex items-center justify-between w-full gap-4 p-3 bg-bg-dark-100 text-white"
    }
  >
    <Logo />
    <Address />
    <Contacts />
    <HeaderNavigation />
    <HeaderButtons />
  </header>
);
