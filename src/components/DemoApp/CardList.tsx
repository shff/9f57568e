interface CardListProps<T> {
  title: string;
  items: T[];
  children: (item: T, idx: number) => JSX.Element;
}

const CardList = <T,>({ title, items, children }: CardListProps<T>) => (
  <div className="h-screen bg-gray-900 p-4 text-white">
    <div className="mx-auto max-w-4xl p-4">
      <p className="m-4 text-left text-gray-300">🏡 Home</p>
      <h1 className="m-4 text-left text-5xl font-bold">{title}</h1>
      <p className="m-4 text-left text-gray-300">{items.length} items found.</p>
      <hr className="m-4" />
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-2">
        {items.map((item, idx) => children(item, idx))}
      </div>
    </div>
  </div>
);

export default CardList;
