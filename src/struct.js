
ct";
import * as faker from "faker";
import { FixedSizeList as List } from "react-window";

faker.seed(3);

function App() {
  const [data, setData] = useState(() =>
    Array.from({ length: 1200 }, () => ({
      productImg: faker.image.business(200, 600, true),
      product: faker.commerce.product(),
      productPrice: faker.commerce.price(2, 22, 1, "$"),
      productDescription: faker.commerce.productAdjective(),
    }))
  );

  function Item({
    productImg,
    product,
    productPrice,
    productDescription,
    ...props
  }) {
    return (
      <li className="py-4 border-2 border-indigo-400 flex" {...props}>
        <img className="h-10 w-10 rounded-full" src={productImg} alt="" />
        <div className="ml-3">
          <p className="space-x-1">
            <span className="text-base text-gray-900 whitespace-nowrap">
              {product}
            </span>
            <span
              className="text-gray-600 text-base font-extrabold"
              style={{
                backgroundImage:
                  "linear-gradient(transparent 50%, pink 50%, pink 85%,transparent 85%,transparent 100%)",
              }}
            >
              {productPrice}
            </span>
          </p>
          <p className="text-sm text-gray-500">{productDescription}</p>
        </div>
      </li>
    );
  }
  function Skeleton({ ...props }) {
    return (
      <li className="py-4 flex" {...props}>
        <span className="h-10 w-10 rounded-full bg-gray-300 animate-pulse" />
        <div className="ml-3">
          <p className="space-x-1">
            <span className="inline-block h-3 w-24 bg-gray-400 animate-pulse" />
            <span className="inline-block h-2 w-12 bg-pink-300 animate-pulse" />
          </p>
          <p className="inline-block h-2 w-44 bg-gray-200 animate-pulse" />
        </div>
      </li>
    );
  }
  return (
    <main className="grid place-items-center min-h-screen">
      <List
        itemKey={faker.datatype.uuid}
        height={600}
        width={400}
        itemCount={data.length}
        itemSize={76}
        useIsScrolling={true}
      >
        {({ index, style, isScrolling }) =>
          isScrolling ? (
            <Skeleton style={style} />
          ) : (
            <Item
              style={style}
              productImg={data[index].productImg}
              product={data[index].product}
              productPrice={data[index].productPrice}
              productDescription={data[index].productDescription}
            />
          )
        }
      </List>
    </main>
  );
}

export default App;
