interface ModalProps {
  children: React.ReactNode;
  title: string;
  close: () => void;
}

const Modal = ({ children, title, close }: ModalProps) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900/75">
    <div className="w-[32rem] rounded-lg bg-gray-800 p-6 text-white">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      {children}
      <button className="mt-4 text-red-500" onClick={() => close()}>
        Close
      </button>
    </div>
  </div>
);

export default Modal;
