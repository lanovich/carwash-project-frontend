import { Address, Contacts, HeaderButtons, Logo } from ".";

export const Header = () => (
  <header
    className={
      "sticky top-0 z-50 flex items-center justify-between w-full gap-4 p-3 bg-bg-dark-100 text-white"
    }
  >
    <Logo />
    <Address />
    <Contacts />
    <HeaderButtons />
  </header>
);
