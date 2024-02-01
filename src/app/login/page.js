'use client';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import { useState } from 'react';

export default function Page() {
    const [userForm, setUserForm] = useState ({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUserForm({...userForm, [e.target.name]: e.target.value})
    }

    const submit = async (e) => {
        e.preventDefault();
        console.log(userForm.email, userForm.password);
    }

    return (
      <>
        <h1>Connexion</h1>
        <form onSubmit={(e)=> submit(e)}>
            <Input label={'Adresse email'} name={'email'} value={userForm.email} placeholder={'email'} type={'email'} onChange={(e) => handleChange(e)} isRequired={true} />
            <Input label={'Mot de passe'} name={'password'} value={userForm.password} placeholder={'mot de passe'} type={'password'} onChange={(e) => handleChange(e)} isRequired={true} />
            <Button type={'submit'} title={'Se connecter'}/>
        </form>
      </>
    );
  }
  