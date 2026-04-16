"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function ProfileSelector() {
  const [profiles] = useState([
    { id: "p1", name: "Thomaz (Primary)", type: "PRIMARY" },
    { id: "p2", name: "Wife", type: "SECONDARY" },
  ]);
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          <span>{selectedProfile.name}</span>
          <span className="text-xs text-muted-foreground ml-2">
            {selectedProfile.type}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {profiles.map((profile) => (
          <DropdownMenuItem
            key={profile.id}
            onClick={() => setSelectedProfile(profile)}
            className="cursor-pointer"
          >
            {profile.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/configuracoes/perfis" className="cursor-pointer block text-primary">
            Gerenciar Perfis
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
