'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  propsData,
  optionInterfaceData,
  enhancedOptionInterfaceData,
  columns,
} from './api-table-options';
import { SimpleTable } from '@/components/yaui/simple-table';

export default function ApiDocs() {
  return (
    <div className="p-2 w-[860px] space-y-4 mx-auto">
      <div className="space-y-4 text-center">
        <p className="text-gray-600">
          Comprehensive documentation for the SelectContentPro component props,
          interfaces, and internal components.
        </p>
      </div>

      {/* Props */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Props
            <Badge variant="outline">Component Props</Badge>
          </CardTitle>
          <CardDescription>
            All available props for the SelectContentPro component.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleTable
            columns={columns}
            data={propsData}
            cellClassName="font-mono text-xs"
          />
        </CardContent>
      </Card>

      <Separator />

      {/* Option Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Option Interface
            <Badge variant="secondary">Interface</Badge>
          </CardTitle>
          <CardDescription>
            The basic structure for individual options in the select component.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleTable
            columns={columns}
            data={optionInterfaceData}
            cellClassName="font-mono text-xs"
          />
        </CardContent>
      </Card>

      <Separator />

      {/* Enhanced Option Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            EnhancedOption Interface
            <Badge variant="secondary">Interface</Badge>
          </CardTitle>
          <CardDescription>
            Extended option interface with additional properties for internal
            use.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleTable
            columns={columns}
            data={enhancedOptionInterfaceData}
            cellClassName="font-mono text-xs"
          />
        </CardContent>
      </Card>
    </div>
  );
}
