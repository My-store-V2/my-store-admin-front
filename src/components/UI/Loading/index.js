import styles from "./index.module.scss";
import LoaderGif from "../../../../public/images/loader.gif";
import Image from "next/image";

const Index = ({ isLoad }) => {
    return (
        <>
            {
                isLoad && (
                    <div className={styles.wrapper}>
                        <div className={styles.content}>
                            <Image src={LoaderGif} alt="loader" />
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default Index;