function Header() {
  return (
    <>
      <div
        className="text-center lg:px-40 mt-20 text-3xl sm:text-4xl lg:text-5xl 
        font-bold leading-tight sm:leading-tight lg:leading-tight"
      >
        <div>
          <span>Your </span>
          <span className="text-primary">Project </span>
          <span>roadmap </span>
        </div>
        <div>
          <span className="">created by </span>
          <span className="text-primary ">People</span>
        </div>
      </div>

      <p className="mt-6 sm:px-16 md:px-32 lg:px-36 text-center lg:text-lg">
        <span className="font-semibold">Profeed</span> is the platform to help
        you create that perfect project. Connect with your users and get their
        feedback, be it new features, enhancements or bugs. See what your users
        want and devise your roadmap.
      </p>

      <img
        src="/images/landing.svg"
        alt="People providing their feedback"
        className="mt-11"
      />
    </>
  );
}

export default Header;
