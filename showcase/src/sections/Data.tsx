import { useState } from 'react';
import {
  Panel,
  PanelHeader,
  PanelBody,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  TableRoot,
  TableHead,
  TableBody,
  TableRow,
  TableTh,
  TableTd,
  ListRow,
  ListGroup,
  Pagination,
  Badge,
  Button,
  StatusPill,
} from '@tronvercel/ui';
import { ComponentDemo, Section } from './shared';

const TABLE_ROWS = [
  { name: 'api-gateway', status: 'ok' as const, region: 'us-east-1', uptime: '99.98%' },
  { name: 'worker-pool', status: 'warn' as const, region: 'us-west-2', uptime: '99.71%' },
  { name: 'db-replica', status: 'danger' as const, region: 'eu-west-1', uptime: '87.20%' },
];

export function DataSection() {
  const [page, setPage] = useState(1);

  return (
    <div>
      <Section title="Panel">
        <ComponentDemo
          name="Panel / PanelHeader / PanelBody"
          description="Base surface container with optional structured header."
          demo={
            <Panel flush className="w-full max-w-sm">
              <PanelHeader
                title="Deployments"
                hint="3 active"
                actions={<Button size="sm" variant="primary">Deploy</Button>}
              />
              <PanelBody>
                <p className="text-sm text-muted">Panel body content here.</p>
              </PanelBody>
            </Panel>
          }
          code={`import { Panel, PanelHeader, PanelBody, Button } from '@tronvercel/ui';

<Panel flush>
  <PanelHeader
    title="Deployments"
    hint="3 active"
    actions={<Button size="sm" variant="primary">Deploy</Button>}
  />
  <PanelBody>
    <p>Content here</p>
  </PanelBody>
</Panel>`}
        />
      </Section>

      <Section title="Card">
        <ComponentDemo
          name="Card / CardHeader / CardBody / CardFooter"
          description="Content card with header, body, and footer slots. Three variants: default, flush, ghost."
          demo={
            <Card className="w-full max-w-xs">
              <CardHeader
                title="Project Alpha"
                description="Last deployed 2 hours ago"
                actions={<Badge tone="ok">live</Badge>}
              />
              <CardBody>
                <p className="text-xs text-muted">
                  Region: us-east-1 · Build: #1247 · 3 instances
                </p>
              </CardBody>
              <CardFooter>
                <Button size="sm" variant="ghost">View logs</Button>
              </CardFooter>
            </Card>
          }
          code={`import { Card, CardHeader, CardBody, CardFooter, Badge, Button } from '@tronvercel/ui';

<Card>
  <CardHeader
    title="Project Alpha"
    description="Last deployed 2 hours ago"
    actions={<Badge tone="ok">live</Badge>}
  />
  <CardBody><p>Region: us-east-1</p></CardBody>
  <CardFooter>
    <Button size="sm" variant="ghost">View logs</Button>
  </CardFooter>
</Card>`}
        />
      </Section>

      <Section title="Table">
        <ComponentDemo
          name="TableRoot / TableHead / TableBody"
          description="Data table with fixed-width columns and status indicators."
          demo={
            <Panel flush className="w-full">
              <TableRoot>
                <TableHead>
                  <TableRow>
                    <TableTh>Service</TableTh>
                    <TableTh>Status</TableTh>
                    <TableTh>Region</TableTh>
                    <TableTh>Uptime</TableTh>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {TABLE_ROWS.map((row) => (
                    <TableRow key={row.name}>
                      <TableTd className="font-mono text-xs">{row.name}</TableTd>
                      <TableTd><StatusPill tone={row.status} label={row.status} /></TableTd>
                      <TableTd className="text-muted">{row.region}</TableTd>
                      <TableTd className="font-mono text-xs">{row.uptime}</TableTd>
                    </TableRow>
                  ))}
                </TableBody>
              </TableRoot>
            </Panel>
          }
          code={`import {
  TableRoot, TableHead, TableBody,
  TableRow, TableTh, TableTd,
  StatusPill,
} from '@tronvercel/ui';

<TableRoot>
  <TableHead>
    <TableRow>
      <TableTh>Service</TableTh>
      <TableTh>Status</TableTh>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableTd>api-gateway</TableTd>
      <TableTd><StatusPill tone="ok">ok</StatusPill></TableTd>
    </TableRow>
  </TableBody>
</TableRoot>`}
        />
      </Section>

      <Section title="ListRow">
        <ComponentDemo
          name="ListRow / ListGroup"
          description="List with leading/trailing slots and interactive hover."
          demo={
            <Panel flush className="w-full max-w-sm">
              <ListGroup>
                <ListRow
                  interactive
                  leading={<span className="font-mono text-xs text-accent">01</span>}
                  trailing={<Badge tone="ok">live</Badge>}
                >
                  <span className="text-sm text-fg">api-gateway</span>
                </ListRow>
                <ListRow
                  interactive
                  leading={<span className="font-mono text-xs text-accent">02</span>}
                  trailing={<Badge tone="warn">degraded</Badge>}
                >
                  <span className="text-sm text-fg">worker-pool</span>
                </ListRow>
                <ListRow
                  muted
                  leading={<span className="font-mono text-xs text-faint">03</span>}
                  trailing={<Badge>disabled</Badge>}
                >
                  <span className="text-sm">legacy-svc</span>
                </ListRow>
              </ListGroup>
            </Panel>
          }
          code={`import { Panel, ListGroup, ListRow, Badge } from '@tronvercel/ui';

<Panel flush>
  <ListGroup>
    <ListRow
      interactive
      leading={<span>01</span>}
      trailing={<Badge tone="ok">live</Badge>}
    >
      api-gateway
    </ListRow>
    <ListRow muted trailing={<Badge>disabled</Badge>}>
      legacy-svc
    </ListRow>
  </ListGroup>
</Panel>`}
        />
      </Section>

      <Section title="Pagination">
        <ComponentDemo
          name="Pagination"
          description="Page navigation with prev/next and page number buttons."
          demo={
            <Pagination page={page} totalPages={8} onPageChange={setPage} />
          }
          code={`import { Pagination } from '@tronvercel/ui';
const [page, setPage] = useState(1);

<Pagination page={page} totalPages={8} onPageChange={setPage} />`}
        />
      </Section>
    </div>
  );
}
