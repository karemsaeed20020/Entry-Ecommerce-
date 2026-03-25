import React from "react";
import Container from "../Container";
import { SelectLanguage } from "./SelectLanguage";

const TopBanner = () => {
  return (
    <div className="py-2 text-sm font-medium w-full bg-primary text-primary-foreground border-b border-b-border/20">
      <Container className="flex items-center justify-between">
        <p className="text-center">
          Black Friday Shopping {" "}
          <span className="hidden md:inline-flex">
            and Small Business Saturday Deals!!!
          </span>
        </p>
        <div className="flex items-center justify-between">
            <SelectLanguage />
        </div>
      </Container>
    </div>
  );
};

export default TopBanner;
