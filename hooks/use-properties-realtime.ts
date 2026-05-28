"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function usePropertiesRealtime(onChange: (payload: any) => void) {
  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("properties-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "properties",
        },
        (payload) => {
          console.log("🔥 REALTIME EVENT:", payload);

          onChange?.(payload);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
}
