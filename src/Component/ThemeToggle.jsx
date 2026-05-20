"use client";
import { Check, Power } from "@gravity-ui/icons";

import { Switch } from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {({ isSelected }) => (
        <>
          <Switch.Control
            className={`h-[31px] w-[51px] rounded-full bg-gray-500 ${isSelected ? "bg-black-500 shadow-[0_0_12px_rgba(0,0,0,0.5)]" : ""}`}
          >
            <Switch.Thumb
              className={`size-[27px] rounded-full bg-white shadow-sm ${isSelected ? "ms-[22px] shadow-lg" : ""}`}
            >
              <Switch.Icon>
                {isSelected ? (
                  <Moon className="size-4 text-cyan-600" />
                ) : (
                  <Sun className="size-4 text-blue-600" />
                )}
              </Switch.Icon>
            </Switch.Thumb>
          </Switch.Control>
        </>
      )}
    </Switch>
  );
}
