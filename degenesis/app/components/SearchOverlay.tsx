"use client"

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Search, X, Clock, MessageSquare, Loader2
} from "lucide-react";
import { followUser } from "../lib/follow";
import { useAccount } from "wagmi";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  walletAddress: string | null;
}

export default function SearchOverlay({
  isOpen,
  onClose,
  onSearch,
  walletAddress,
}: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { address } = useAccount();

  const handleFollow = async (targetAddress: string) => {
    if (!address) {
      alert("Connect your wallet first.");
      return;
    }
  
    if (address.toLowerCase() === targetAddress.toLowerCase()) {
      alert("You cannot follow yourself.");
      return;
    }
  
    try {
      const res = await followUser(walletAddress || "", address, {
        follower: address,
        whoToFollow: targetAddress,
        profileOrCommunity: "profile",
      });
  
      console.log("✅ Followed:", res.message);
    } catch (err) {
      console.error("❌ Follow failed:", err);
      alert("Follow failed. Please ensure the address is valid and try again.");
    }
  };
  

  const handleSearch = () => {
    if (!query.trim()) return;

    setIsLoading(true);
    if (!recentSearches.includes(query)) {
      setRecentSearches((prev) => [query, ...prev.slice(0, 4)]);
    }
    onSearch(query);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleRecentSearch = (search: string) => {
    setQuery(search);
    onSearch(search);
    onClose();
  };

  const removeRecentSearch = (search: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches((prev) => prev.filter((item) => item !== search));
  };

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center pt-16 px-4">
      <div ref={overlayRef} className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="flex items-center p-4 border-b border-gray-100">
          <Search className="h-5 w-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 border-0 focus:ring-0 text-lg placeholder-gray-400 py-1"
            placeholder="Search wallet address"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          {query && (
            <button onClick={() => setQuery("")} className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          )}
          <button onClick={onClose} className="ml-2 px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-full">
            Cancel
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
            </div>
          ) : query ? (
            <div className="p-4 space-y-3">
              <div className="p-3 border rounded-lg hover:bg-gray-50 transition flex items-center justify-between">
                {/* <div>
                  <div className="font-bold text-gray-900">{query}</div>
                  <div className="text-sm text-gray-500">Matching address for "{query}"</div>
                </div> */}
                <button
                  onClick={() => handleFollow(query)}
                  className="text-orange-500 font-medium text-sm hover:underline"
                >
                  Follow
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <h3 className="text-lg font-bold mb-3">Recent searches</h3>
              {recentSearches.length > 0 ? (
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      onClick={() => handleRecentSearch(search)}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-400 mr-3" />
                        <span>{search}</span>
                      </div>
                      <button
                        onClick={(e) => removeRecentSearch(search, e)}
                        className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  <MessageSquare className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                  <p>Try searching for wallet addresses</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
