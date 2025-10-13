"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  propsData,
  refMethodsData,
  optionInterfaceData,
  columns,
} from "./api-table-options";
import { SimpleTable } from "@/components/yaui/simple-table";

export default function ApiDocs() {
  return (
    <div className="p-2 w-[860px] space-y-4 mx-auto">
      <div className="space-y-4 text-center">
        <p className="text-gray-600">
          Comprehensive documentation for the MultiAsyncSelect component props,
          interfaces, and methods.
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
            All available props for the MultiAsyncSelect component.
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
            The structure for individual options in the select component.
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

      {/* Ref Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Ref Methods
            <Badge variant="outline">Imperative Handle</Badge>
          </CardTitle>
          <CardDescription>
            Methods available through the component ref for external control.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleTable
            columns={columns}
            data={refMethodsData}
            cellClassName="font-mono text-xs"
          />
        </CardContent>
      </Card>
    </div>
  );
}
