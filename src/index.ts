import './styles/globals.css';

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './components/ui/button';
export { Input, type InputProps } from './components/ui/input';
export {
  Badge,
  StatusDot,
  StatusPill,
  type BadgeProps,
  type StatusDotProps,
  type StatusPillProps,
  type Tone,
} from './components/ui/badge';
export { Panel, PanelHeader, PanelBody, type PanelProps, type PanelHeaderProps } from './components/ui/panel';
export { Kbd } from './components/ui/kbd';
export { Spinner } from './components/ui/spinner';
export { Textarea, type TextareaProps } from './components/ui/textarea';
export { Label, type LabelProps } from './components/ui/label';
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from './components/ui/select';
export { Checkbox, type CheckboxProps } from './components/ui/checkbox';
export { Switch, type SwitchProps } from './components/ui/switch';
export { RadioGroup, RadioItem, type RadioItemProps } from './components/ui/radio';
export { cn } from './lib/utils';
export {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  type CardProps,
  type CardHeaderProps,
  type CardVariant,
} from './components/ui/card';
export {
  TableRoot,
  TableHead,
  TableBody,
  TableRow,
  TableTh,
  TableTd,
  TableFoot,
} from './components/ui/table';
export { ListRow, ListGroup, type ListRowProps } from './components/ui/list-row';
export { Skeleton, SkeletonText, type SkeletonProps } from './components/ui/skeleton';
export { Pagination, type PaginationProps } from './components/ui/pagination';
export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  type ToastProps,
} from './components/ui/toast';

export {
  AuthProvider,
  useAuth,
  AuthCard,
  LoginForm,
  SSOButton,
  AuthGuard,
  RequireAuth,
  UserMenu,
} from './components/ui/auth';
export type {
  AuthProviderProps,
  AuthCardProps,
  LoginFormProps,
  SSOButtonProps,
  AuthGuardProps,
  UserMenuProps,
  AuthUser as AuthUserClient,
  SSOProvider,
  AuthContextValue,
} from './components/ui/auth';

// Overlay / interactive primitives
export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/ui/dialog';

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerClose,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from './components/ui/drawer';

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
} from './components/ui/popover';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from './components/ui/dropdown-menu';

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from './components/ui/tooltip';

export {
  Tabs,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './components/ui/tabs';

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from './components/ui/command';
export type { CommandDialogProps } from './components/ui/command';

export { Code, CodeSnippet, type CodeProps, type CodeSnippetProps } from './components/ui/code-snippet';

// --- Composite / App-level components ---

// Layout helpers
export { Stack, Inline, Grid, Section } from './components/ui/layout';

// App shell
export {
  AppShell,
  Sidebar,
  NavGroup,
  NavItem,
  Topbar,
  useShell,
  type AppShellProps,
  type SidebarProps,
  type NavGroupProps,
  type NavItemProps,
  type TopbarProps,
} from './components/ui/app-shell';

// Page structure
export {
  PageHeader,
  Toolbar,
  FilterBar,
  type PageHeaderProps,
  type BreadcrumbItem,
  type ToolbarProps,
} from './components/ui/page-header';

// Data table
export {
  DataTable,
  type DataTableProps,
  type ColumnDef,
  type SortDir,
} from './components/ui/data-table';

// Key-value / description lists
export {
  KeyValue,
  DescriptionList,
  type KeyValueItem,
  type KeyValueProps,
  type DescriptionListProps,
} from './components/ui/key-value';

// App UX states
export {
  EmptyState,
  LoadingState,
  ErrorState,
  type EmptyStateProps,
  type LoadingStateProps,
  type ErrorStateProps,
} from './components/ui/empty-state';

// Error boundary
export { ErrorBoundary, type ErrorBoundaryProps } from './components/ui/error-boundary';

// Confirm dialog (composite — dialog primitives already exported above)
export { ConfirmDialog, DialogRoot, type ConfirmDialogProps } from './components/ui/confirm-dialog';

// Toast manager (wired provider + useToast hook)
export { ToastManager, useToast } from './components/ui/toast-manager';

// Command palette
export {
  CommandPalette,
  type CommandPaletteProps,
  type CommandItem as CommandPaletteItem,
} from './components/ui/command-palette';

// Dropdown (composite aliases — distinct from DropdownMenu primitives above)
export {
  DropdownRoot,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownCheckboxItem,
  DropdownRadioItem,
  DropdownRadioGroup,
  DropdownSub,
  DropdownSubTrigger,
  DropdownPortal,
} from './components/ui/dropdown';

// Metric cards
export {
  MetricCard,
  StatBlock,
  type MetricCardProps,
  type StatBlockProps,
} from './components/ui/metric-card';

// Code block / Kbd combos
export { CodeBlock, KbdCombo, type CodeBlockProps, type KbdComboProps } from './components/ui/code-block';
