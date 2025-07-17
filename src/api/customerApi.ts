export interface CustomerData {
  id: string;  
  customerCode: string;
  customerName: string;
  customerInn: string;
  customerKpp: string;
  customerLegalAddress: string;
  customerPostalAddress: string;
  customerEmail: string;
  customerCodeMain: string;
  isOrganization: boolean;
  isPerson: boolean;
}


 


 export const getAllCustomers = async (): Promise<CustomerData[]> => {
  const response = await fetch('http://localhost:8080/api/v1/customers/all'); 

  if (!response.ok) {
    throw new Error(`Ошибка при получении клиентов: ${response.status}`);
  }

  const data = await response.json();
  };




export const createCustomer = async (newCustomer: Omit<CustomerData, 'id'>): Promise<CustomerData> => {
  const response = await fetch('http://localhost:8080/api/v1/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCustomer),
  });

  if (!response.ok) {
    throw new Error(`Ошибка при создании клиента: ${response.status}`);
  }

  const data = await response.json();
  return { ...data, id: data.customerCode }; 
};



/*
  console.log('Данные от сервера:', data);

  return data.map((customer: Omit<CustomerData, 'id'>) => ({
    ...customer,
    id: customer.customerCode, 
    
  }));*/


/*
  //
  return data.map((customer: Omit<CustomerData, 'id'>) => ({
    ...customer,
    id: customer.customerCode,
  }));
};
*/