import styles from "@/app/page.module.scss";
import Card from "@/components/card";

export default function Home() {
    return (
        <div className={`${styles.center} `}>
            <div className={`${styles.title}`}>Dashboard</div>
            <div className={`${styles.content}`}>
                <Card
                    title="Users"
                    description="Manage users"
                    image="/images/user_card_img.jpeg"
                    path="/users"
                />
                <Card
                    title="Products"
                    description="Manage products"
                    image="/images/product_card_img.jpeg"
                    path="/products"
                />
                <Card
                    title="Orders"
                    description="Manage orders"
                    image="/images/order_card_img.jpeg"
                    path="/orders"
                />
            </div>
        </div>
    );
}
