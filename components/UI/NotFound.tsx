import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col items-center pt-32">
      <img src="/images/empty.svg" alt="Empty page" />
      <p className="text-center mt-5">
        Looks like you have followed a broken url
      </p>
      <p className="text-center">
        Let&apos;s get you back to{" "}
        <span className="text-primary">
          <Link href="/">safety</Link>
        </span>
      </p>
    </div>
  );
}

export default NotFound;
