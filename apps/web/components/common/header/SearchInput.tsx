"use client";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

const SearchInput = ({ className }: { className?: string }) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Image search states
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Validate file type
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }
      // validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should ve less than 5MB');
        return;
      }
      setSelectedImage(file);

      // create preview 
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      }
      reader.readAsDataURL(file);

      // Clear text search when using image search
      setSearch("");
    }
    // Reset input value to allow selecting the same file again
    event.target.value = "";
  };

  // Clear image search
  const clearImageSearch = () => {
    setImagePreview(null);
    setSelectedImage(null);
    setError(null);
  };

  return (
    <div ref={searchRef} className={`relative lg:w-full ${className || ""}`}>
      {/* Desktop search form (hidden on mobile - mobile toggle lives in Header) */}
      <form
        className="relative hidden lg:flex items-center bg-primary-foreground rounded-md"
        onSubmit={(e) => e.preventDefault()}
      >
        {imagePreview ? (
          <div className="flex-1 py-2 px-3 rounded-md bg-card border-2 border-accent flex items-center gap-2">
            <div className="w-10 h-10 overflow-hidden rounded shrink-0">
              <Image
                src={imagePreview}
                alt="Search image"
                className="object-cover w-full h-full"
                width={40}
                height={40}
              />
            </div>
            <span className="text-sm text-muted-foreground flex-1 truncate">
              Searching by image...
            </span>
          </div>
        ) : (
          <>
            <Input
              placeholder="Search Products..."
              className="flex-1 rounded-sm py-6 focus-visible:ring-0 focus-visible:border-accent bg-card text-foreground placeholder:font-semibold placeholder:tracking-wide pr-16"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setShowResults(true)}
            />
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
        />
        <div className="absolute right-3 top-2.5 flex items-center gap-2 text-primary border-l border-l-primary/50 pl-2">
            {search || imagePreview ? (
            <X
              onClick={imagePreview ? clearImageSearch : () => setSearch("")}
              className="w-5 h-5 hover:text-accent hoverEffect cursor-pointer"
            />
          ) : (
            <Search className="w-5 h-5 hover:text-accent hoverEffect" />
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
