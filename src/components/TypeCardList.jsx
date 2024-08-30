"use client";

import React, { useCallback, useMemo } from 'react';
import { useUpdateTypeCardMutation, useGetTypeCardQuery, useDeleteTypeCardMutation } from '@/api/typeCardSlice';

export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:8080/api/v1/type-card');
    const data = await res.json();
    return {
      props: {
        initialData: {
          data: {
            items: data.data?.items || [] 
          }
        }
      }
    };
  } catch (error) {
    console.error('Failed to fetch initial data:', error);
    return {
      props: {
        initialData: {
          data: {
            items: [] 
          }
        }
      }
    };
  }
}

const TypeCardList = ({ initialData = { data: { items: [] } } }) => {
  const { data, isError, isLoading } = useGetTypeCardQuery();
  const [updateTypeCard] = useUpdateTypeCardMutation();
  const [deleteTypeCard] = useDeleteTypeCardMutation();

  const items = useMemo(() => {
    return data?.data?.items || initialData.data?.items || [];
  }, [data, initialData]);

  const handleEdit = useCallback((typeCardId, newName) => {
    if (!newName) return;
    updateTypeCard({ id: typeCardId, name: newName })
  }, [updateTypeCard]);

  const handleDelete = useCallback((typeCardId) => {
    deleteTypeCard(typeCardId)
  }, [deleteTypeCard]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred: {isError.message}</div>;

  return (
    <ul>
      {items.map(typeCard => (
        <li key={typeCard.id} className="flex items-center space-x-4">
          <span>{typeCard.name}</span>
          <button onClick={() => handleEdit(typeCard.id, prompt('New name:', typeCard.name))}>Edit</button>
          <button onClick={() => handleDelete(typeCard.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TypeCardList;