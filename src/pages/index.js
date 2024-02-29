import styles from "@/app/page.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <div className={`${styles.center} ${styles.flexrow}`}>
      <Link className={`${styles.button}`} href={"/users"}>Utilisateurs</Link>
      <Link className={`${styles.button}`} href={"/products"}>Produits</Link>
    </div>
  );
}