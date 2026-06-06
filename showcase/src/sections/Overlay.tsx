import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerFooter,
  Popover,
  PopoverTrigger,
  PopoverContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@tronvercel/ui';
import { ComponentDemo, Section } from './shared';

export function OverlaySection() {
  return (
    <TooltipProvider>
      <div>
        <Section title="Dialog">
          <ComponentDemo
            name="Dialog"
            description="Modal dialog with header, body, and footer. Traps focus and closes on Escape."
            demo={
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm action</DialogTitle>
                    <DialogDescription>
                      This will permanently delete the resource. This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button variant="danger">Delete</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            }
            code={`import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogDescription,
  DialogFooter, DialogClose,
} from '@tronvercel/ui';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm action</DialogTitle>
      <DialogDescription>This cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
      <Button variant="danger">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
          />
        </Section>

        <Section title="Drawer">
          <ComponentDemo
            name="Drawer"
            description="Bottom sheet overlay, slides up from screen bottom. Drag handle included."
            demo={
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="default">Open Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Settings</DrawerTitle>
                    <DrawerDescription>
                      Manage your account preferences below.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4 py-2 text-sm text-muted">
                    Drawer content goes here.
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="ghost">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            }
            code={`import {
  Drawer, DrawerTrigger, DrawerContent,
  DrawerHeader, DrawerTitle, DrawerClose,
} from '@tronvercel/ui';

<Drawer>
  <DrawerTrigger asChild>
    <Button>Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader><DrawerTitle>Settings</DrawerTitle></DrawerHeader>
    <div>Content here</div>
    <DrawerFooter>
      <DrawerClose asChild><Button variant="ghost">Close</Button></DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
          />
        </Section>

        <Section title="Popover">
          <ComponentDemo
            name="Popover"
            description="Anchored floating panel for contextual content."
            demo={
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="default">More info</Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 text-sm text-muted">
                  <p className="font-medium text-fg">Deployment info</p>
                  <p className="mt-1 text-xs">Region: us-east-1 · Build #1234</p>
                </PopoverContent>
              </Popover>
            }
            code={`import { Popover, PopoverTrigger, PopoverContent } from '@tronvercel/ui';

<Popover>
  <PopoverTrigger asChild>
    <Button>More info</Button>
  </PopoverTrigger>
  <PopoverContent className="w-56">
    <p className="font-medium">Deployment info</p>
    <p className="text-xs text-muted">Region: us-east-1</p>
  </PopoverContent>
</Popover>`}
          />
        </Section>

        <Section title="DropdownMenu">
          <ComponentDemo
            name="DropdownMenu"
            description="Context menu with items, separators, and keyboard navigation."
            demo={
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default">Actions ▾</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-danger">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            }
            code={`import {
  DropdownMenu, DropdownMenuTrigger,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator,
} from '@tronvercel/ui';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Actions ▾</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>View details</DropdownMenuItem>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-danger">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
          />
        </Section>

        <Section title="Tooltip">
          <ComponentDemo
            name="Tooltip"
            description="Hover tooltip. Wrap your app with TooltipProvider once."
            demo={
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>Deploy to production</TooltipContent>
              </Tooltip>
            }
            code={`import {
  TooltipProvider, Tooltip,
  TooltipTrigger, TooltipContent,
} from '@tronvercel/ui';

// Wrap app once:
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>Deploy to production</TooltipContent>
  </Tooltip>
</TooltipProvider>`}
          />
        </Section>
      </div>
    </TooltipProvider>
  );
}
