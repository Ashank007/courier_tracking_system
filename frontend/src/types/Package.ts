export interface Package {
  id: string;
  name: string;
  status: 'In Transit' | 'Delivered' | 'Pending' | 'Failed';
  location: string;
  deliveryDate: string;
}

