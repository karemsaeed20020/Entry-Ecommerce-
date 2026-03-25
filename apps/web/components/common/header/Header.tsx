import React from "react";
import TopBanner from "./TopBanner";
import Container from "../Container";
import Logo from "../Logo";
import SearchInput from "./SearchInput";

const Header = ({logoUrl} : {logoUrl?: string | null}) => {
  return (
    <header className="border-b top-0 bg-primary text-primary-foreground">
      <TopBanner />
      <Container className="flex items-center justify-between py-2 lg:py-5">
        <div className="flex items-center gap-3 lg:gap-5 flex-1">
          {/* logo section */}
          <div className="flex items-center gap-2 shrink-0 lg:min-w-72">
            {/* Sidebar  */}
            <div className="w-auto">
              <Logo logoUrl={logoUrl} />
            </div>
          </div>
          {/* Search & Actions Section  */}
          <div className="flex lg:flex-1 items-center justify-end gap-5 order-3 lg:order-0">
            <SearchInput className="lg:flex-1" />
            <div>
                <div className="hidden lg:flex items-center gap-5 shrink-0">
              <p>He;;p</p>
              <p>He;;p</p>
              <p>He;;p</p>
            </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
