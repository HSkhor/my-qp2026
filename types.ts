import React from 'react';

export type Role = 'CONTROLLER' | 'VIEWER';

export interface User {
  username: string;
  name: string;
  role: Role;
}

export interface ProcedureStep {
  no: string;
  activity: React.ReactNode;
  responsibility: string;
}

export interface RecordItem {
  no: string;
  type: string;
  fileNo: string;
  location: string;
  retention: string;
}

export interface AmendmentItem {
  no: string;
  version: string;
  date: string;
  details: React.ReactNode;
}

export interface FlowchartStep {
  id: string;
  type: 'start' | 'end' | 'process' | 'decision';
  label: string;
  secondaryLabel?: string; // Used for decision branching notes or 'No' path text
}

export interface DistributionItem {
  copyNo: string;
  location: string;
}

export interface QPContent {
  objectives?: React.ReactNode;
  scope?: React.ReactNode;
  references?: React.ReactNode;
  definitions?: React.ReactNode;
  records?: RecordItem[];
  amendments?: AmendmentItem[];
  distributionList?: DistributionItem[];
  flowchart?: React.ReactNode; // Legacy support for static JSX
  flowchartData?: FlowchartStep[]; // New structured data
}

export interface Attachment {
  id: string;
  docNo: string;
  title: string;
  content: React.ReactNode;
}

export interface QPData {
  id: string;
  docNo: string;
  title: string;
  versionNo: string;
  amendmentNo: string;
  dateOfIssue: string;
  relatedDoc?: string;
  preparedBy: {
    name: string;
    designation: string;
    date: string;
  };
  approvedBy: {
    name: string;
    designation: string;
    date: string;
  };
  procedures: ProcedureStep[];
  content?: QPContent;
  attachments?: Attachment[];
}

export interface DocumentSection {
  id: string;
  title: string;
  component: React.ReactNode;
}

export interface HeaderProps {
  docNo: string;
  versionNo: string;
  amendmentNo: string;
  dateOfIssue: string;
  pageNo: string;
}

export interface TableRow {
  no: string;
  activity: React.ReactNode;
  responsibility: string;
}