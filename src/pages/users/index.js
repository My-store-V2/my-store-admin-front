'use client';
import ManageList from '@/components/ManageList';
import CardUser from '@/components/UI/card/user_card';
import FormUser from '@/components/UI/form/user_form';

export default function Home() {
    return (
        <>
            <ManageList title="users" db_name="users" Card={CardUser} Form={FormUser} />
        </>
    );
}
