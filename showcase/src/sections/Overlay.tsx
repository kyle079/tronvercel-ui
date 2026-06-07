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
  DrawerBody,
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
            description="Bottom sheet detail surface. Compose with DrawerHeader, DrawerBody, and DrawerFooter for a standard scrollable layout."
            demo={
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="default">Open Deployment</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Deployment #4821</DrawerTitle>
                    <DrawerDescription>
                      Queued by witness in us-east-1 with the standard detail-drawer layout.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerBody className="space-y-4 text-sm">
                    <div className="grid grid-cols-2 gap-3 rounded-md border border-line bg-surface p-4">
                      <div>
                        <p className="text-2xs uppercase tracking-[0.18em] text-faint">Status</p>
                        <p className="mt-1 font-medium text-fg">Healthy</p>
                      </div>
                      <div>
                        <p className="text-2xs uppercase tracking-[0.18em] text-faint">Duration</p>
                        <p className="mt-1 font-medium text-fg">2m 14s</p>
                      </div>
                      <div>
                        <p className="text-2xs uppercase tracking-[0.18em] text-faint">Commit</p>
                        <p className="mt-1 font-mono text-xs text-muted">8f2d9b1</p>
                      </div>
                      <div>
                        <p className="text-2xs uppercase tracking-[0.18em] text-faint">Region</p>
                        <p className="mt-1 font-medium text-fg">us-east-1</p>
                      </div>
                    </div>
                    <div className="rounded-md border border-line bg-surface p-4 text-muted">
                      This body region owns drawer scrolling and shared horizontal padding.
                    </div>
                  </DrawerBody>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="ghost">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            }
            code={`import {
  Drawer, DrawerTrigger, DrawerContent, DrawerBody,
  DrawerHeader, DrawerTitle, DrawerDescription,
  DrawerFooter, DrawerClose,
} from '@tronvercel/ui';

<Drawer>
  <DrawerTrigger asChild>
    <Button>Open Deployment</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Deployment #4821</DrawerTitle>
      <DrawerDescription>Queued by witness in us-east-1.</DrawerDescription>
    </DrawerHeader>
    <DrawerBody className="space-y-4">
      <div>Detail blocks go here</div>
    </DrawerBody>
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
