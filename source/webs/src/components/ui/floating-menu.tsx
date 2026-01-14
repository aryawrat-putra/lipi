import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Context for enforcing composition rules
type FloatingMenuContextValue = {
  isWithinMenu: boolean;
  isSideBySide: boolean;
  setIsSideBySide: (is: boolean) => void;
};

const FloatingMenuContext = React.createContext<FloatingMenuContextValue>({
  isWithinMenu: false,
  isSideBySide: false,
  setIsSideBySide: () => { }
});

// Custom hook to ensure components are used within FloatingMenu
const useFloatingMenuContext = (componentName: string) => {
  const context = React.useContext(FloatingMenuContext);
  if (!context.isWithinMenu) {
    throw new Error(
      `<${componentName}> must be used within a <FloatingMenu> component.`
    );
  }
  return context;
};

// Root FloatingMenu Component
interface FloatingMenuProps extends React.ComponentProps<"aside"> {
  children: React.ReactNode;
}

function FloatingMenu({ className, children, ...props }: FloatingMenuProps) {
  const [is, setIs] = React.useState<boolean>(false);

  return (
    <FloatingMenuContext.Provider value={{
      isWithinMenu: true,
      isSideBySide: is,
      setIsSideBySide: setIs
    }}>
      <aside
        className={cn(
          "absolute min-w-xs max-w-sm rounded-lg border bg-popover text-popover-foreground shadow-lg px-2 py-1 space-y-1",
          className
        )}
        role="menu"
        {...props}
      >
        {children}
      </aside>
    </FloatingMenuContext.Provider>
  );
}

// Separator Component
interface FloatingMenuSeparatorProps extends React.ComponentProps<"div"> { }
import { Separator } from "@/components/ui/separator";

function FloatingMenuSeparator({
  className,
  ...props
}: FloatingMenuSeparatorProps) {
  useFloatingMenuContext("FloatingMenuSeparator");

  return (
    <Separator
      className={cn("", className)}
      role="separator"
      {...props}
    />
  );
}

// Group Component for logical grouping
interface FloatingMenuGroupProps extends React.ComponentProps<"ul"> {
  children: React.ReactNode;
  isSideBySide?: boolean;
}

function FloatingMenuGroup({
  className,
  children,
  isSideBySide = false,
  ...props
}: FloatingMenuGroupProps) {
  useFloatingMenuContext("FloatingMenuGroup");

  const { setIsSideBySide } = useFloatingMenuContext("FloatingMenuGroup");

  React.useEffect(() => {
    setIsSideBySide(isSideBySide);
  }, [isSideBySide]);

  return (
    <ul className={cn(
      "space-x-2 space-y-2",
      isSideBySide && 'flex flex-row flex-wrap justify-evenly',
      className
    )} role="group" {...props}>
      {children}
    </ul>
  );
}

// MenuItem Component
interface FloatingMenuItemProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  disabled?: boolean;
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function FloatingMenuItem({
  className,
  children,
  disabled = false,
  onSelect,
  ...props
}: FloatingMenuItemProps) {
  useFloatingMenuContext("FloatingMenuItem");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onSelect?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect?.(event as any);
    }
  };

  const { isSideBySide } = React.useContext(FloatingMenuContext);

  return (
    <Button
      className={cn(
        isSideBySide ? 'w-fit' : "w-full",
        'justify-start truncate',
        className
      )}
      disabled={disabled}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      variant='ghost'
      {...props}
    >
      {children}
    </Button>
  );
}

// Label Component (non-interactive)
interface FloatingMenuLabelProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  inset?: boolean;
}

function FloatingMenuLabel({
  className,
  children,
  inset = false,
  ...props
}: FloatingMenuLabelProps) {
  useFloatingMenuContext("FloatingMenuLabel");

  return (
    <div
      className={cn(
        "px-2 py-1.5 text-sm",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Empty State Component
interface FloatingMenuEmptyProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
}

function FloatingMenuEmpty({
  className,
  children = "No items to show",
  ...props
}: FloatingMenuEmptyProps) {
  useFloatingMenuContext("FloatingMenuEmpty");

  return (
    <div
      className={cn(
        "px-2 py-1 text-center text-sm text-muted-foreground",
        className
      )}
      role="status"
      {...props}
    >
      {children}
    </div>
  );
}

export {
  FloatingMenu,
  FloatingMenuItem,
  FloatingMenuSeparator,
  FloatingMenuGroup,
  FloatingMenuLabel,
  FloatingMenuEmpty
};