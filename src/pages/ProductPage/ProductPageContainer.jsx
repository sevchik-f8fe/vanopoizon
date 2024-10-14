import ProductPage from "./ProductPage";
import TableOfSizes from "./TableOfSizes";
import BuyProductPage from "./BuyProductPage";
import { useProductPage } from "./store";

const ProductPageContainer = () => {
    const { currentPage } = useProductPage();

    return (<>
        {(currentPage == 'productPage') ? (
            <ProductPage />
        ) : (
            currentPage == 'tableOfSizes' ? (
                <TableOfSizes />
            ) : (
                currentPage == 'buyProductPage' ? (
                    <BuyProductPage />
                ) : (
                    <>ошибка</>
                )
            )
        )}
    </>);
}

export default ProductPageContainer;