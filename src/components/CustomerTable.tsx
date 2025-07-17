
import { Table, TableColumn } from '@consta/uikit/Table';
import { Text } from '@consta/uikit/Text';
import { CustomerData, getAllCustomers, } from '../api/customerApi.ts';
import React, { useEffect, useState } from 'react';

const columns: TableColumn<CustomerData>[] = [
  { title: 'Код', accessor: 'customerCode', sortable: true },
  { title: 'Наименование', accessor: 'customerName', sortable: true },
  { title: 'ИНН', accessor: 'customerInn', sortable: true },
  { title: 'КПП', accessor: 'customerKpp', sortable: true },
  { title: 'Юр. адрес', accessor: 'customerLegalAddress' },
  { title: 'Почтовый адрес', accessor: 'customerPostalAddress' },
  { title: 'Email', accessor: 'customerEmail' },
  { title: 'Код главного', accessor: 'customerCodeMain' },
  { title: 'Организация', accessor: 'isOrganization' },
  { title: 'Физ. лицо', accessor: 'isPerson' },
];

export const CustomerTable = () => {
  const [data, setData] = useState<CustomerData[]>([]);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  /*
  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/customers/all');
console.log(response) 
const json = await response.json();
console.log(json);
      } catch (error) {
        console.log(error);
        
      }
     
})();

*/


useEffect(() => {
  void (async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/customers/all');
      const json = await response.json();
      console.log('Данные с сервера:', json);

      // Добавляем поле id, если его нет в JSON
      const customersWithId = json.map((customer: Omit<CustomerData, 'id'>) => ({
        ...customer,
        id: customer.customerCode,
      }));

      setData(customersWithId);
    } catch (error) {
      console.error('Ошибка при загрузке клиентов:', error);
    }
  })();




}, []);





/*

  getAllCustomers()
    .then((customers) => {
      setData(customers);
    })
    .catch((error) => console.error('Ошибка загрузки данных:', error));
    
    */

 
  const sortedData = React.useMemo(() => {
    if (!sortBy) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortBy as keyof CustomerData];
      const bVal = b[sortBy as keyof CustomerData];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'boolean' && typeof bVal === 'boolean') {
        return sortOrder === 'asc'
          ? Number(aVal) - Number(bVal)
          : Number(bVal) - Number(aVal);
      }

      return 0;
    });
  }, [data, sortBy, sortOrder]);

  const handleSort = (column: TableColumn<CustomerData>) => {
  if (sortBy === column.accessor) {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  } else if (column.accessor) {
    setSortBy(column.accessor);
    setSortOrder('asc');
  }
};

  return (
    <div style={{ padding: 20 }}>
      <Text view="primary" size="2xl" weight="bold" align="center">
        Список клиентов
      </Text>
      
        <Table
      columns={columns}
      rows={sortedData}
      borderBetweenRows
      borderBetweenColumns
      zebraStriped="odd" 
        />
    </div>
  );
 
};
