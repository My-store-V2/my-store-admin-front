'use client';
import ManageList from '@/components/ManageList';
import ProductCard from '@/components/UI/card/product_card';
import FormUser from '@/components/UI/form/product_form';

export default function Home() {
  return (
    <>
      <ManageList title="products" db_name="products" Card={ProductCard} Form={FormUser} />
    </>
  );
}
