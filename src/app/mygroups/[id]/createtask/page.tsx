'use client';

import { CreateTask } from '@/components/tasks/CreateTask';
import React from 'react';

export default function Home({ params }: { params: Promise<{ id: number }> }) {
  const { id: groupId } = React.use(params);

  return <CreateTask groupId={groupId} />;
}
