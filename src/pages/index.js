import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href={"/users"}>Utilisateurs</Link>
      <Link href={"/products"}>Produits</Link>
    </>
  );
}