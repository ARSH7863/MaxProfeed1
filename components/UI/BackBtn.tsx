import { useRouter } from "next/router";
import { IoChevronBack } from "react-icons/io5";

interface BackButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const BackBtn: React.FunctionComponent<BackButtonProps> = (props) => {
  const router = useRouter();

  return (
    <button
      className="btn btn-xs btn-link text-secondary hover:no-underline"
      onClick={() => router.back()}
      {...props}
    >
      <IoChevronBack size={15} />
      Go Back
    </button>
  );
};

export default BackBtn;
