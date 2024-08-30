"use client";

import { typeCardApi } from '@/api/typeCardSlice';
import { ApiProvider } from '@reduxjs/toolkit/query/react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <ApiProvider api={typeCardApi}>{children}</ApiProvider>;
}